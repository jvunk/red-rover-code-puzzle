"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";

export const TechnicalAnalysis = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/docs/system-wide-srs.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="mt-6 rounded-xl bg-white/30 p-6 ring-1 ring-gray-900/5 backdrop-blur-sm dark:bg-white/5 dark:inset-ring dark:inset-ring-white/5 prose prose-slate dark:prose-invert w-full max-w-7xl">
      <ReactMarkdown rehypePlugins={[rehypeSlug]}>{markdown}</ReactMarkdown>
    </div>
  );
};
