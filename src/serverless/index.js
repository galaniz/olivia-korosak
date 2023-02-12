/**
 * Serverless function
 */

/* Imports */

import render from '../render'
import httpError from '../render/http-error'
import getContentfulDataServerless from '../utils/get-contentful-data-serverless'

/* Function */

const serverless = async ({ request, env }) => {
  console.log('SERVERLESS', request, env)

  try {
    /* Query */

    const { searchParams, pathname } = new URL(request.url)
    const page = searchParams.get('page')
    const filters = searchParams.get('filters')
    const path = pathname
    const query = {}

    if (page) {
      query.page = page
    }

    if (filters) {
      query.filters = filters
    }

    const data = await render({
      serverlessData: { query, path },
      getContentfulData: getContentfulDataServerless,
      env: {
        dev: env.ENVIRONMENT === 'dev',
        prod: env.ENVIRONMENT === 'production',
        ctfl: {
          spaceId: env.CTFL_SPACE_ID,
          cpaToken: env.CTFL_CPA_TOKEN,
          cdaToken: env.CTFL_CDA_TOKEN
        }
      }
    })

    /* Output */

    const html = data?.output ? data.output : ''

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html;charset=UTF-8'
      }
    })
  } catch (error) {
    console.error('Error with serverless function: ', error)

    return new Response(httpError('500'), {
      status: error.httpStatusCode || 500
    })
  }
}

export default serverless
