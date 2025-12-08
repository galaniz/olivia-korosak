/**
 * Worker - Turnstile
 */

/* Imports */

import type { WorkerEnv, WorkerTurnstile } from './workerTypes.js'
import type { ServerlessActionData } from '@alanizcreative/formation-static/serverless/serverlessTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

/**
 * Verify Turnstile token.
 *
 * @param {ServerlessActionData} data
 * @param {Request} request
 * @param {WorkerEnv} env
 * @return {Promise<void>}
 */
const workerServerlessTurnstile = async (
  data: ServerlessActionData,
  request: Request,
  env: WorkerEnv
): Promise<void> => {
  const turnstileToken = data.inputs.turnstile?.value

  if (!isStringStrict(turnstileToken)) {
    throw new Error('Missing token')
  }

  const turnstileResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      secret: env.CF_TURNSTILE_KEY,
      response: turnstileToken,
      remoteip: request.headers.get('CF-Connecting-IP')
    })
  })

  const turnstileRes = await turnstileResp.json() as WorkerTurnstile

  if (!turnstileRes.success) {
    throw new Error('Verification failed')
  }
}

/* Exports */

export { workerServerlessTurnstile }
