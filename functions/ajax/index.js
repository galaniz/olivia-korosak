/**
 * Functions: ajax
 */

/* Imports */

import mailChannelsPlugin from '@cloudflare/pages-plugin-mailchannels'
import sendForm from '../../src/serverless/send-form'

/* Normalize body data */

const _normalizeBody = (data = {}) => {
  const normalData = {
    inputs: {}
  }

  Object.keys(data).forEach((d) => {
    if (d.startsWith('inputs')) {
      const key = d.replace('inputs', '').replace('][', '.').replace('[', '').replace(']', '')
      const keys = key.split('.')
      const lastIndex = keys.length - 1
      const obj = {}

      let lastLevel = obj

      keys.forEach((k, i) => {
        if (i === 0) {
          return
        }

        if (!lastLevel?.[k]) {
          lastLevel[k] = i === lastIndex ? data[d] : {}
        }

        lastLevel = obj[k]
      })

      if (normalData.inputs?.[keys[0]]) {
        const existingObj = normalData.inputs?.[keys[0]]

        Object.keys(obj).forEach((o) => {
          existingObj[o] = obj[o]
        })
      } else {
        normalData.inputs[keys[0]] = obj
      }
    } else {
      normalData[d] = data[d]
    }
  })

  return normalData
}

/* Function */

const ajax = async ({ request, env }) => {
  try {
    /* Get form data */

    const formData = await request.formData()
    const body = {}

    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1]
    }

    const data = _normalizeBody(body)

    console.log('DATA', data)

    const req = mailChannelsPlugin({
      personalizations: [
        {
          to: [{ email: 'galanizdesign@gmail.com', name: 'Galaniz' }],
        },
      ],
      from: {
        email: 'graciela@alanizcreative.com',
        name: 'Alaniz Creative',
      },
      subject: 'Look! No servers',
      content: [
        {
          type: 'text/plain',
          value: 'And no email service accounts and all for free too!',
        },
      ],
      respondWith: () => {
        return new Response(
          `Thank you for submitting your enquiry. A member of the team will be in touch shortly.`
        );
      },
    })

    console.log('REQ', req)

    /* Output */

    return new Response('YOOOOO', {
      status: 200,
    })
  } catch (error) {
    console.error('Error with ajax function: ', error)

    return new Response(error.message, {
      status: error.httpStatusCode || 500
    })
  }
}

/* Exports */

export const onRequestPost = [ajax]
