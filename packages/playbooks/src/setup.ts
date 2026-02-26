import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SetupResult {
  workflows: string[]
  oz: string[]
  skipped: string[]
}

interface TemplateVars {
  PACKAGE_NAME: string
  REPO: string
  DOCS_PATH: string
  SRC_PATH: string
}

// ---------------------------------------------------------------------------
// Variable detection from package.json
// ---------------------------------------------------------------------------

function detectVars(root: string): TemplateVars {
  const pkgPath = join(root, 'package.json')
  let pkgJson: Record<string, unknown> = {}
  try {
    pkgJson = JSON.parse(readFileSync(pkgPath, 'utf8'))
  } catch { /* fallback to defaults */ }

  const name = typeof pkgJson.name === 'string' ? pkgJson.name : 'unknown'
  const playbook = pkgJson.playbook as Record<string, unknown> | undefined

  const repo = typeof playbook?.repo === 'string'
    ? playbook.repo
    : name.replace(/^@/, '').replace(/\//, '/')

  const docs = typeof playbook?.docs === 'string'
    ? playbook.docs
    : 'docs/'

  // Best-guess src path from common monorepo patterns
  const shortName = name.replace(/^@[^/]+\//, '')
  let srcPath = `packages/${shortName}/src/**`
  if (existsSync(join(root, 'src'))) {
    srcPath = 'src/**'
  }

  return {
    PACKAGE_NAME: name,
    REPO: repo,
    DOCS_PATH: docs.endsWith('**') ? docs : docs.replace(/\/$/, '') + '/**',
    SRC_PATH: srcPath,
  }
}

// ---------------------------------------------------------------------------
// Template variable substitution
// ---------------------------------------------------------------------------

function applyVars(content: string, vars: TemplateVars): string {
  return content
    .replace(/\{\{PACKAGE_NAME\}\}/g, vars.PACKAGE_NAME)
    .replace(/\{\{REPO\}\}/g, vars.REPO)
    .replace(/\{\{DOCS_PATH\}\}/g, vars.DOCS_PATH)
    .replace(/\{\{SRC_PATH\}\}/g, vars.SRC_PATH)
}

// ---------------------------------------------------------------------------
// Copy helpers
// ---------------------------------------------------------------------------

function copyTemplates(
  srcDir: string,
  destDir: string,
  vars: TemplateVars,
): { copied: string[]; skipped: string[] } {
  const copied: string[] = []
  const skipped: string[] = []

  if (!existsSync(srcDir)) return { copied, skipped }

  mkdirSync(destDir, { recursive: true })

  for (const entry of readdirSync(srcDir)) {
    const srcPath = join(srcDir, entry)
    const destPath = join(destDir, entry)

    if (existsSync(destPath)) {
      skipped.push(destPath)
      continue
    }

    const content = readFileSync(srcPath, 'utf8')
    const substituted = applyVars(content, vars)
    writeFileSync(destPath, substituted)
    copied.push(destPath)
  }

  return { copied, skipped }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function runSetup(root: string, metaDir: string, args: string[]): SetupResult {
  const doAll = args.includes('--all')
  const doWorkflows = doAll || args.includes('--workflows')
  const doOz = doAll || args.includes('--oz')

  // If no flags, default to --all
  const defaultAll = !doWorkflows && !doOz
  const installWorkflows = doWorkflows || defaultAll
  const installOz = doOz || defaultAll

  const vars = detectVars(root)
  const result: SetupResult = { workflows: [], oz: [], skipped: [] }

  const templatesDir = join(metaDir, 'templates')

  if (installWorkflows) {
    const srcDir = join(templatesDir, 'workflows')
    const destDir = join(root, '.github', 'workflows')
    const { copied, skipped } = copyTemplates(srcDir, destDir, vars)
    result.workflows = copied
    result.skipped.push(...skipped)
  }

  if (installOz) {
    const srcDir = join(templatesDir, 'oz')
    const destDir = join(root, '.playbook', 'oz')
    const { copied, skipped } = copyTemplates(srcDir, destDir, vars)
    result.oz = copied
    result.skipped.push(...skipped)
  }

  // Print results
  for (const f of result.workflows) console.log(`✓ Copied workflow: ${f}`)
  for (const f of result.oz) console.log(`✓ Copied Oz prompt: ${f}`)
  for (const f of result.skipped) console.log(`  Already exists: ${f}`)

  if (result.workflows.length === 0 && result.oz.length === 0 && result.skipped.length === 0) {
    console.log('No templates directory found. Is @tanstack/playbooks installed?')
  } else {
    console.log(`\nTemplate variables applied:`)
    console.log(`  Package:  ${vars.PACKAGE_NAME}`)
    console.log(`  Repo:     ${vars.REPO}`)
    console.log(`  Docs:     ${vars.DOCS_PATH}`)
    console.log(`  Src:      ${vars.SRC_PATH}`)
  }

  return result
}
