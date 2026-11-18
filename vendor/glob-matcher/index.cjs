"use strict";

const { Minimatch } = require("minimatch");
const scan = require("./lib/scan");
const { isWindows, toPosixSlashes } = require("./lib/utils");

function compile(pattern, options) {
  // Prevent unbounded nested extglob and brace expansion through the matcher.
  // Keep pathname comparison independent of the host OS after normalization.
  return new Minimatch(pattern.replace(/^\.\//, ""), {
    platform: "linux",
    nocomment: true,
    nonegate: options.nonegate,
    noext: options.noextglob || options.noext,
    nobrace: options.nobrace,
    noglobstar: options.noglobstar,
    nocase: options.nocase,
    dot: options.dot,
    matchBase: options.matchBase || options.basename,
    maxExtglobRecursion: 2,
    braceExpandMax: 1000,
  });
}

function createMatcher(patterns, options = {}, returnState = false) {
  if (Array.isArray(patterns)) {
    const matchers = patterns.map(pattern => createMatcher(pattern, options));
    return input => matchers.some(match => match(input));
  }

  const matcher = compile(patterns, options);
  const state = { negated: matcher.negate, negatedExtglob: !options.noext && !options.noextglob && patterns.startsWith("!(") };
  const ignore = options.ignore && createMatcher(options.ignore, { ...options, ignore: undefined, onResult: undefined, onMatch: undefined, onIgnore: undefined });
  const windows = isWindows(options);

  function match(input, returnDetails = false) {
    const output = options.format ? options.format(input) : windows ? toPosixSlashes(input) : input;
    const matches = output !== "" && matcher.match(output.replace(/^\.\//, ""));
    const result = { glob: patterns, state, input, output, isMatch: matches };
    options.onResult?.(result);
    if (matches && ignore?.(output)) {
      options.onIgnore?.(result);
      result.isMatch = false;
    } else if (matches) {
      options.onMatch?.(result);
    }
    return returnDetails ? result : result.isMatch;
  }

  if (returnState) match.state = state;
  return match;
}

createMatcher.scan = scan;
createMatcher.isMatch = (input, patterns, options) => createMatcher(patterns, options)(input);
createMatcher.makeRe = (pattern, options = {}) => compile(pattern, options).makeRe() || /(?!)^/;
module.exports = createMatcher;
