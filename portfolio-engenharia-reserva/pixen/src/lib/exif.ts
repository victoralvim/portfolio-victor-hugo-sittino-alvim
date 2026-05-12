import { execFile } from "child_process";
import { promisify } from "util";
import { ExifField } from "@/types/exif";

const execFileAsync = promisify(execFile);

export async function extractExif(filePath: string): Promise<ExifField[]> {
  try {
    // -j outputs JSON format
    // -sort sorts the output alphabetically by tag name
    const { stdout } = await execFileAsync("exiftool", ["-j", "-sort", filePath]);
    
    const data = JSON.parse(stdout);
    if (!data || data.length === 0) {
      return [];
    }

    const fields: ExifField[] = [];
    const metadata = data[0];

    for (const [key, value] of Object.entries(metadata)) {
      // Filter out internal ExifTool/File system tags that aren't useful to the user
      if (
        key !== "SourceFile" &&
        key !== "ExifTool:ExifToolVersion" &&
        key !== "File:Directory" &&
        key !== "File:FilePermissions"
      ) {
        fields.push({
          tag: key,
          value: value as string | number,
        });
      }
    }

    return fields;
  } catch (error) {
    console.error("ExifTool execution error:", error);
    throw new Error(
      "Failed to extract Exif data. Ensure ExifTool is installed on the server (e.g., `apt install libimage-exiftool-perl` or `brew install exiftool`)."
    );
  }
}
