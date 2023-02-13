/**
 * Serverless: send form
 */

/* Function */

const sendForm = async ({ request, env }) => {
  try {

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

export default sendForm
