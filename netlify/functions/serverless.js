/**
 * Serverless function
 */

/* Imports */

const contentful = require('../../_data/contentful')

/* Function */

export const handler = async (event, context) => {
  const { path, queryStringParameters } = event

  console.log('SERVERLESS_CONTEXT', event)

  try {
    const data = await contentful({
      serverlessData: {
        query: queryStringParameters,
        path: path
      }
    })

    body = data?.output ? data.output : ''

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
      body,
    };
  } catch (error) {
    return {
      statusCode: error.httpStatusCode || 500,
      body: JSON.stringify(
        {
          error: error.message,
        },
        null,
        2
      ),
    };
  }
}
