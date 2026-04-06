import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, sessionId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Save user message to DB
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const chatSessionId = sessionId || crypto.randomUUID();

    // Save the latest user message
    const lastUserMsg = messages[messages.length - 1];
    if (lastUserMsg?.role === "user") {
      await supabase.from("chat_messages").insert({
        session_id: chatSessionId,
        role: "user",
        content: lastUserMsg.content,
      });
    }

    const systemPrompt = `당신은 김진수(May) 전문가의 AI 비서입니다. 24시간 친절하게 응답합니다.

김진수 전문가 소개:
- GEO마케팅(Generative Engine Optimization) 전문가
- AI활용교육 전문가, 강사 양성 전문가
- 저서 25권+ 저자
- Google Certified Educator, Gemini Certified Educator
- AICLab 대표, 메이랜드AI비즈랩 운영
- AI 아트 & 전시 (캔버스 아트 전시회 6회 주최)
- 유튜브 '메이TV' 운영
- n8n 워크플로우, GPTs 맞춤형 챗봇 설계 전문

주요 서비스:
1. GEO 전략 컨설팅 - 생성형 AI가 인용하는 콘텐츠 전략 설계
2. AI활용 코칭·큐레이션 - https://magent-may.vercel.app/
3. AI 교육·강사 양성 - https://www.aiclab.kr/
4. AI 아트 & 전시 - https://canvas-art-t2k4.vercel.app/exhibition
5. AI 업무 자동화 - n8n, GPTs, Agent 기반

연락처: info@aiclab2020.com / 010-8921-9536
주소: 서울특별시 서초구 서초중앙로2길 35

답변 규칙:
- 한국어로 친절하고 전문적으로 답변하세요
- 관련 링크가 있으면 안내하세요
- 강의/컨설팅 문의는 이메일이나 전화로 연락하도록 안내하세요
- 마크다운 형식으로 깔끔하게 답변하세요`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "서비스 크레딧이 부족합니다." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI 서비스 오류" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // We need to collect the full response to save it, while still streaming to client
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    let fullResponse = "";

    (async () => {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          await writer.write(value);
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
            try {
              const parsed = JSON.parse(line.slice(6));
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) fullResponse += content;
            } catch {}
          }
        }
      } finally {
        // Save assistant response
        if (fullResponse) {
          await supabase.from("chat_messages").insert({
            session_id: chatSessionId,
            role: "assistant",
            content: fullResponse,
          });
        }
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream", "X-Session-Id": chatSessionId },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
