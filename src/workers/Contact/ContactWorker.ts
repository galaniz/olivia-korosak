/**
 * Workers - Contact
 */

/* Imports */

import type { ContactEnv } from './ContactTypes.js'
import type { Store } from '@alanizcreative/formation-static/store/storeTypes.js'
import type { ServerlessAction } from '@alanizcreative/formation-static/serverless/serverlessTypes.js'
import { setConfig } from '@alanizcreative/formation-static/config/config.js'
import { setFilters } from '@alanizcreative/formation-static/filters/filters.js'
import { setServerless, doServerlessAction } from '@alanizcreative/formation-static/serverless/serverless.js'
import { setStoreItem } from '@alanizcreative/formation-static/store/store.js'
import { Contact } from '@alanizcreative/formation-static/serverless/Contact/Contact.js'
import { workerServerlessTurnstile } from '../workerTurnstile.js'
import { config } from '../../config/config.js'

/**
 * Send contact form email with Resend.
 *
 * @type {ServerlessAction}
 */
const contact: ServerlessAction = async (data, request, env: ContactEnv) => {
  /* Turnstile check */

  await workerServerlessTurnstile(data, request, env)

  /* Form meta */

  setStoreItem('formMeta', await env.CONTACT_KV?.get('formMeta', 'json') as Store['formMeta'])

  /* Process inputs and send email */

  delete data.inputs.turnstile

  return Contact(data, request, env)
}

/**
 * Manage contact form submissions.
 */
export default {
  /**
   * @param {Request} request
   * @param {ContactEnv} env
   * @return {Promise<Response>}
   */
  async fetch (request: Request, env: ContactEnv): Promise<Response> {
    const { headers, method } = request

    /* Check origin */

    const allowedOrigins = env.CF_CONTACT_ALLOWED_ORIGINS
    const origin = headers.get('Origin')
    const origins = allowedOrigins?.split(',')

    if (!origin || !origins || !origins.includes(origin)) {
      return new Response(JSON.stringify({ error: 'Unauthorized origin' }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    /* CORS handling */

    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': origin,
      'Content-Type': 'application/json'
    }

    /* Handle options method (preflight request) */

    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      })
    }

    /* Set up */

    setConfig(config)
    setServerless({ contact, 'contact-dev': contact })
    setFilters({
      contactResult: async (_, body) => {
        const { to, sender, subject, text, html, replyTo } = body

        const data: Record<string, string | string[]> = {
          to,
          from: sender,
          subject,
          text,
          html
        }

        if (replyTo) {
          data.reply_to = replyTo
        }

        const resendResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        if (!resendResp.ok) {
          return {
            error: {
              message: 'Resend failed',
              response: resendResp
            }
          }
        }

        return {
          success: {
            message: 'Resend success'
          }
        }
      }
    })

    /* Result */

    return await doServerlessAction(request, env, corsHeaders, 'ac_hp') // Request method checked here
  }
}
