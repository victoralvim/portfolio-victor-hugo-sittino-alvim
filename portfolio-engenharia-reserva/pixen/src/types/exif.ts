export interface ExifField {
  tag: string;
  value: string | number;
}

export interface AnalysisResult {
  hash: string;
  fields: ExifField[];
  error?: string;
}
