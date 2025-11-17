"use client";

import { useMemo } from "react";
import { parseInput } from "@/services/parser";
import { ParserResult, OutputFormat } from "@/types/parser";

/**
 * Hook to parse nested field strings
 * Only re-evaluates when input or format changes
 */
export function useParser(
  input: string,
  format: OutputFormat = "unsorted"
): ParserResult {
  const result = useMemo(() => {
    return parseInput(input, format);
  }, [input, format]);

  return result;
}
