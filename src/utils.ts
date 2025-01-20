import { existsSync, mkdirSync } from 'node:fs'
import { access, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

export async function fsExists(path: string) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

export function fsEnsureDirSync(path: string) {
  const targetDir = dirname(path)
  if (existsSync(targetDir)) return
  mkdirSync(targetDir, { recursive: true })
}

export async function fsEnsureDir(path: string) {
  const targetDir = dirname(path)
  if (await fsExists(targetDir)) return
  await mkdir(targetDir, { recursive: true })
}
