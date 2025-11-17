export type ParsedField = {
  name: string;
  children?: ParsedField[];
};

export type ParserResult = {
  data: ParsedField[] | null;
  error: string | null;
  formatted: string;
};

export type OutputFormat = "unsorted" | "alphabetical";

export type ValidationError = {
  message: string;
};
