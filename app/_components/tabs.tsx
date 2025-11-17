"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ProblemStatement } from "./problem-statement";
import { TechnicalAnalysis } from "./technical-analysis";

export const HomePageTabs = () => {
  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      <Tabs
        defaultValue="problem-statement"
        className="w-full max-w-7xl mx-auto mt-8"
      >
        <TabsList className="justify-center">
          <TabsTrigger value="problem-statement">Problem Statement</TabsTrigger>
          <TabsTrigger value="technical-analysis">
            Technical Analysis
          </TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
        </TabsList>
        <TabsContent value="problem-statement">
          <ProblemStatement />
        </TabsContent>
        <TabsContent value="technical-analysis">
          <TechnicalAnalysis />
        </TabsContent>
        <TabsContent value="solution">
          <div> SOLUTION </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
