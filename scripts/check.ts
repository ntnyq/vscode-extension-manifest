/**
 * @file check before commit
 */

import process from 'node:process'

import { readExtensionManifest } from '../src'

export async function checkPackageJson() {
  try {
    const manifest = await readExtensionManifest()
    if (
      manifest.contributes
      || manifest.publisher
      || manifest.activationEvents
      || manifest.capabilities
      || manifest.categories
      || manifest.extensionPack
      || manifest.extensionPack
    ) {
      console.log('\n❗️ Unexpected properties in package.json')
      return process.exit(1)
    }

    console.log('\n✅ package.json is valid')
  } catch {
    console.log('\n❗️ Ops, something went wrong')
    process.exit(1)
  }
}

await checkPackageJson()
