import crypto from "crypto";

export function generateHash(): string {
  return crypto.randomUUID();
}
