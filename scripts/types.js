// @ts-check

/**
 * Scripts - Types
 */

import { execFileSync } from 'node:child_process'

/**
 * Wrangler config paths by worker name.
 */
const workers = {
  Contact: 'src/workers/Contact/wrangler.jsonc',
  Site: 'wrangler.jsonc'
}

/**
 * Extra wrangler args like --check.
 */
const args = process.argv.slice(2)

/* Generate or check binding types */

for (const [name, config] of Object.entries(workers)) {
  execFileSync('npx', [
    'wrangler',
    'types',
    `src/workers/${name}/worker-configuration.d.ts`,
    '-c',
    config,
    '--env-interface',
    `${name}Bindings`,
    ...args
  ], { stdio: 'inherit' })
}
