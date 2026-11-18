# Build glob matcher

The root npm override replaces every installed copy of picomatch with this local package. It uses Minimatch for matching and regular-expression generation, and retains only the MIT-licensed path scanner, constants and utility functions from picomatch 2.3.2. The upstream regular-expression parser is absent. The adapter covers the matcher interfaces used by this project's Vite, Vitest and Tailwind dependency chain. Re-run the glob regression tests before changing those tools or the override.

The repository uses npm with `install-links=true` to package the local dependency consistently on Windows and Linux. Use `npm ci` to install from the root lockfile.
