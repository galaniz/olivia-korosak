/**
 * Serverless function
 */

/* Imports */

import contentful from '../_data/contentful'
import httpError from '../_data/contentful'

/**
 * Async fetch
 * 
 * @param...
 */

export default {
	async fetch(request, env, ctx) {
    console.log('HIYAAAA', request, env, ctx)

		try {
      const { searchParams } = new URL(request.url)
      const page = searchParams.get('page')
      const filters = searchParams.get('filters')
      const path = '/work/tracks/'
      const query = {}
  
      if (page) {
        query.page = parseInt(page)
      }
  
      if (filters) {
        query.filters = filters
      }
  
      const data = await contentful({
        serverlessData: { query, path },
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
  
      const minArgs = {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      }
  
      const html = data?.output ? data.output : ''
  
      return new Response(html, {
        status: 200,
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      })
    } catch (error) {
      console.error('Error with serverless function: ', error)
  
      return new Response(httpError('500'), {
        status: error.httpStatusCode || 500
      })
    }
	}
}
