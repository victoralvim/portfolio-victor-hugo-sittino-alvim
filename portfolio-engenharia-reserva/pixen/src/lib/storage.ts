import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";
import os from "os";
import { AnalysisResult } from "@/types/exif";

const STORAGE_DIR = join(os.tmpdir(), "exif-info-storage");

async function ensureStorage() {
  try {
    await mkdir(STORAGE_DIR, { recursive: true });
  } catch (e) {
    // Directory might already exist, ignore error
  }
}

export async function saveResult(hash: string, result: AnalysisResult): Promise<void> {
  await ensureStorage();
  const filePath = join(STORAGE_DIR, `${hash}.json`);
  await writeFile(filePath, JSON.stringify(result), "utf-8");
}

export async function getResult(hash: string): Promise<AnalysisResult | null> {
  try {
    const filePath = join(STORAGE_DIR, `${hash}.json`);
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}
