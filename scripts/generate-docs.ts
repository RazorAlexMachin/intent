import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateReferenceDocs } from '@tanstack/typedoc-config'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

await generateReferenceDocs({
  packages: [
    {
      name: 'agents',
      entryPoints: [resolve(__dirname, '../packages/agents/src/index.ts')],
      tsconfig: resolve(__dirname, '../packages/agents/tsconfig.docs.json'),
      outputDir: resolve(__dirname, '../docs/agents'),
    },
  ],
})

console.log('\n✅ All markdown files have been processed!')

process.exit(0)
