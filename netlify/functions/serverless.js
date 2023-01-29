/**
 * Serverless function
 */

/* Imports */

const contentful = require('../../_data/contentful')

/* */

export const handler = async (event) => {
  const { path, queryStringParameters } = event

  try {
    const output = await contentful({
      serverlessData: {
        query: queryStringParameters,
        path: path
      }
    })

    console.log('OUTPUT', output)

    body = output?.archive?.[0]?.content ? output.archive[0].content : ''

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