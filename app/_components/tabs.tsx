"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ProblemStatement } from "./problem-statement";
import { TechnicalAnalysis } from "./technical-analysis";
import { Solution } from "./solution";
import { GithubIcon } from "lucide-react";

export const HomePageTabs = () => {
  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.8,
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      <Tabs
        defaultValue="problem-statement"
        className="w-full max-w-7xl mx-auto mt-8"
      >
        <div className="flex items-center justify-between">
          <TabsList className="justify-center">
            <TabsTrigger value="problem-statement">
              Problem Statement
            </TabsTrigger>
            <TabsTrigger value="technical-analysis">
              Technical Analysis
            </TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
          </TabsList>
          <>
            <a
              href="https://github.com/jvunk/red-rover-code-puzzle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600/80 hover:text-indigo-600 transition-colors hover:underline flex items-center gap-1"
            >
              <GithubIcon className="text-base" />
              View GitHub Repository
            </a>
          </>
        </div>
        <TabsContent value="problem-statement">
          <ProblemStatement />
        </TabsContent>

        <TabsContent value="technical-analysis">
          <TechnicalAnalysis />
        </TabsContent>

        <TabsContent value="solution">
          <Solution />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
