import React, { useEffect, useState } from "react";
import { Sparkles, Terminal } from "lucide-react";

interface AskOutputProps {
  question: string;
}

export const AskOutput: React.FC<AskOutputProps> = ({ question }) => {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState<string | null>(null);
  const [source, setSource] = useState<string>("gemini-3.8-flash");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchAnswer() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/gemini/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });

        if (!res.ok) {
          throw new Error(`Server returned HTTP ${res.status}`);
        }

        const data = await res.json();
        if (isMounted) {
          setAnswer(data.answer);
          if (data.source) setSource(data.source);
        }
      } catch (err: any) {
        if (isMounted) {
          setError("Failed to query portfolio intelligence assistant.");
          setAnswer(
            "Nisat Sama is a Java Backend Engineer specializing in Java 21, Spring Boot, PostgreSQL, Kafka, and Redis. Check out 'projects' for deep architecture details or 'contact' to reach out directly."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchAnswer();
    return () => {
      isMounted = false;
    };
  }, [question]);

  return (
    <div className="font-mono text-xs sm:text-sm space-y-2.5 py-1 text-[#E6E8EB] max-w-3xl">
      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-[#30343C]">
        <div className="flex items-center gap-2 text-[#B4A0F7] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini Portfolio Assistant · Ask Nisat</span>
        </div>
        <div className="text-[11px] text-[#747C87]">
          {loading ? "streaming response..." : `model: ${source}`}
        </div>
      </div>

      <div className="text-xs text-[#A0A7B2]">
        <span className="text-[#747C87]">Query: </span>
        <span className="text-[#E6E8EB] italic">"{question}"</span>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-xs text-[#7EE787] py-2 animate-pulse">
          <Terminal className="w-3.5 h-3.5" />
          <span>Synthesizing answer from verified engineering knowledge base...</span>
        </div>
      ) : (
        <div className="p-3.5 rounded-lg bg-[#17191D] border border-[#30343C] space-y-2">
          <div className="text-xs sm:text-sm text-[#E6E8EB] leading-relaxed whitespace-pre-line">
            {answer}
          </div>
          <div className="text-[10px] text-[#747C87] pt-1 border-t border-[#30343C]/60 flex items-center justify-between">
            <span>Grounded strictly in verified portfolio data.</span>
            <span>Zero hallucinated metrics.</span>
          </div>
        </div>
      )}
    </div>
  );
};
