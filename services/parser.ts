import { ParsedField, OutputFormat, ValidationError } from "@/types/parser";

/**
 * Validates input string against FR-SP-003 requirements
 */
function validateInput(input: string): ValidationError | null {
  // Rule 1: Non-empty string
  if (!input || input.trim().length === 0) {
    return {
      message: "Input cannot be empty",
    };
  }

  // Rule 2: Must start with "(" and end with ")"
  if (!input.startsWith("(") || !input.endsWith(")")) {
    return {
      message: 'Input must begin with "(" and end with ")"',
    };
  }

  // Rule 3: Balanced parentheses
  let balance = 0;
  for (const char of input) {
    if (char === "(") balance++;
    if (char === ")") balance--;
    if (balance < 0) {
      return {
        message: "Unbalanced parentheses detected",
      };
    }
  }
  if (balance !== 0) {
    return {
      message: "Unbalanced parentheses detected",
    };
  }

  // Rule 4: Check comma separation (basic validation)
  // This will be more thoroughly checked during parsing
  const withoutParens = input.slice(1, -1);
  if (withoutParens.includes(",,") || withoutParens.includes(" ,")) {
    return {
      message: "Invalid comma placement",
    };
  }

  return null;
}

/**
 * Split string on commas, but only at the top level (respecting parentheses)
 */
function splitOnTopLevelCommas(content: string): string[] {
  const parts: string[] = [];
  let currentPart = "";
  let parenDepth = 0;

  // Go through each character
  for (let i = 0; i < content.length; i++) {
    const char = content[i];

    // Track when we enter nested parentheses
    if (char === "(") {
      parenDepth++;
      currentPart += char;
      continue;
    }

    // Track when we exit nested parentheses
    if (char === ")") {
      parenDepth--;
      currentPart += char;
      continue;
    }

    // Only split on commas when we're not inside parentheses
    if (char === "," && parenDepth === 0) {
      // Save this part and start a new one
      const trimmedPart = currentPart.trim();
      if (trimmedPart.length > 0) {
        parts.push(trimmedPart);
      }
      currentPart = "";
      continue;
    }

    // Regular character - just add it
    currentPart += char;
  }

  // Don't forget to add the last part
  const trimmedPart = currentPart.trim();
  if (trimmedPart.length > 0) {
    parts.push(trimmedPart);
  }

  return parts;
}

/**
 * Parses nested field string into structured data
 */
function parseNestedFields(input: string): ParsedField[] {
  // Remove outer parentheses
  const content = input.slice(1, -1);

  // Split into array on top-level commas
  const fieldStrings = splitOnTopLevelCommas(content);

  // Process each field string
  const fields: ParsedField[] = [];
  for (const fieldString of fieldStrings) {
    fields.push(parseField(fieldString));
  }

  return fields;
}

/**
 * Parse a single field, checking if it has nested children
 */
function parseField(fieldString: string): ParsedField {
  // Check if this field has nested content
  const openParen = fieldString.indexOf("(");

  if (openParen === -1) {
    // Simple field with no children
    return { name: fieldString };
  }

  // Field with children
  const name = fieldString.substring(0, openParen).trim();
  const nestedPart = fieldString.substring(openParen);
  const children = parseNestedFields(nestedPart);

  return { name, children };
}

/**
 * Sorts fields alphabetically at each level
 */
function sortFields(fields: ParsedField[]): ParsedField[] {
  const sorted = [...fields].sort((a, b) => a.name.localeCompare(b.name));
  return sorted.map((field) => ({
    ...field,
    children: field.children ? sortFields(field.children) : undefined,
  }));
}

/**
 * Formats parsed fields as indented list
 */
function formatOutput(fields: ParsedField[], indent: number = 0): string {
  const prefix = "  ".repeat(indent);
  return fields
    .map((field) => {
      const line = `${prefix}- ${field.name}`;
      if (field.children) {
        return line + "\n" + formatOutput(field.children, indent + 1);
      }
      return line;
    })
    .join("\n");
}

/**
 * Main parser function - validates and parses input
 */
export function parseInput(
  input: string,
  format: OutputFormat = "unsorted"
): { data: ParsedField[] | null; error: string | null; formatted: string } {
  // Validate input
  const validationError = validateInput(input);
  if (validationError) {
    return {
      data: null,
      error: validationError.message,
      formatted: "",
    };
  }

  try {
    // Parse the input
    let parsedFields = parseNestedFields(input);

    // Apply sorting if requested
    if (format === "alphabetical") {
      parsedFields = sortFields(parsedFields);
    }

    // Format for display
    const formatted = formatOutput(parsedFields);

    return {
      data: parsedFields,
      error: null,
      formatted,
    };
  } catch (error) {
    return {
      data: null,
      error: "Failed to parse input: " + (error as Error).message,
      formatted: "",
    };
  }
}
