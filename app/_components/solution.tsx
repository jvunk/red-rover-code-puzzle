"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useParser } from "@/hooks/useParser";
import { OutputFormat } from "@/types/parser";

export const Solution = () => {
  const [value, setValue] = React.useState(
    "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)"
  );
  const [inputValue, setInputValue] = React.useState(value);
  const [outputFormat, setOutputFormat] =
    React.useState<OutputFormat>("unsorted");

  // Parse the input - only runs on blur or format change
  const { formatted, error } = useParser(inputValue, outputFormat);

  const handleBlur = () => {
    setInputValue(value);
  };

  return (
    <div>
      <div className="mt-6 rounded-xl bg-white/30 p-6 ring-1 ring-gray-900/5 backdrop-blur-sm dark:bg-white/5 dark:inset-ring dark:inset-ring-white/5 prose prose-slate dark:prose-invert w-full max-w-7xl">
        <h2> Solution </h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col col-span-3">
            <Label htmlFor="solution-input">Input:</Label>
            <Input
              id="solution-input"
              placeholder="Type here"
              className="mt-2"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="output-format-select">Output Format:</Label>
            <Select
              value={outputFormat}
              onValueChange={(v) => setOutputFormat(v as OutputFormat)}
            >
              <SelectTrigger id="output-format-select" className="mt-2 w-full">
                <SelectValue placeholder="Select an output format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="unsorted">Unsorted</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-4">
            <Label>Output:</Label>
            <div className="w-full rounded-md overflow-x-auto">
              {error ? (
                <div className="text-red-400 font-mono text-sm">{error}</div>
              ) : (
                <pre className="text-gray-100 font-mono text-sm whitespace-pre">
                  {formatted}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-white/30 p-6 ring-1 ring-gray-900/5 backdrop-blur-sm dark:bg-white/5 dark:inset-ring dark:inset-ring-white/5 prose prose-slate dark:prose-invert w-full max-w-7xl">
        <h2> Handled Edge Cases </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
          {/* Edge Case 1: Empty String */}
          <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              Empty Input
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Input must be a non-empty string
            </p>
            <code className="block bg-black/50 p-2 rounded text-xs text-gray-100 mb-2">
              &quot;&quot;
            </code>
            <p className="text-xs text-red-300">Error: Input cannot be empty</p>
          </div>

          {/* Edge Case 2: Missing Parentheses */}
          <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              Missing Parentheses
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Input must begin with &quot;(&quot; and end with &quot;)&quot;
            </p>
            <code className="block bg-black/50 p-2 rounded text-xs text-gray-100 mb-2">
              &quot;id, name, email&quot;
            </code>
            <p className="text-xs text-red-300">
              Error: Input must begin with &quot;(&quot; and end with
              &quot;)&quot;
            </p>
          </div>

          {/* Edge Case 3: Unbalanced Parentheses */}
          <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              Unbalanced Parentheses
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Parentheses must be balanced
            </p>
            <code className="block bg-black/50 p-2 rounded text-xs text-gray-100 mb-2">
              &quot;(id, name, type(id, name)&quot;
            </code>
            <p className="text-xs text-red-300">
              Error: Unbalanced parentheses detected
            </p>
          </div>

          {/* Edge Case 4: Invalid Comma Placement */}
          <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              Invalid Separators
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Fields must be separated by commas
            </p>
            <code className="block bg-black/50 p-2 rounded text-xs text-gray-100 mb-2">
              &quot;(id,, name, email)&quot;
            </code>
            <p className="text-xs text-red-300">
              Error: Invalid comma placement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
