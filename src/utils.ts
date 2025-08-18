import { existsSync, mkdirSync } from 'node:fs'
import { access, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

/**
 * Checks if a file or directory exists asynchronously.
 *
 * @param path - The file or directory path to check.
 * @returns Promise that resolves to true if exists, false otherwise.
 */
export async function fsExists(path: string): Promise<boolean> {
  return access(path)
    .then(() => true)
    .catch(() => false)
}

/**
 * Ensures the directory for the given path exists (synchronously).
 * Creates parent directories if needed.
 *
 * @param path - The file path whose directory should be ensured.
 */
export function fsEnsureDirSync(path: string): void {
  const targetDir = dirname(path)
  if (existsSync(targetDir)) {
    return
  }
  mkdirSync(targetDir, { recursive: true })
}

/**
 * Ensures the directory for the given path exists (asynchronously).
 * Creates parent directories if needed.
 *
 * @param path - The file path whose directory should be ensured.
 * @returns Promise that resolves when the directory exists.
 */
export async function fsEnsureDir(path: string): Promise<void> {
  const targetDir = dirname(path)
  if (await fsExists(targetDir)) {
    return
  }
  await mkdir(targetDir, { recursive: true })
}
