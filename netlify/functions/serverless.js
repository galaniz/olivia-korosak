/**
 * Serverless function
 */

/* Imports */

require('dotenv').config()
const htmlmin = require('html-minifier')
const contentful = require('../../_data/contentful')
const httpError = require('../../_data/contentful')

/* Function */

export const handler = async (event) => {
  const { path, queryStringParameters } = event

  try {
    const data = await contentful({
      serverlessData: {
        query: queryStringParameters,
        path: path
      }
    })

    const minArgs = {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    }

    body = data?.output ? htmlmin.minify(data.output, minArgs) : ''

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
      body,
    }
  } catch (error) {
    console.error('Error with serverless function: ', error)

    return {
      statusCode: error.httpStatusCode || 500,
      body: httpError('500')
    }
  }
}
