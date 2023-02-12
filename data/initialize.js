/**
 * Initialize
 */

/* Imports */

const { writeFile, mkdir } = require('fs')
const render = require('../src/render')
const getContentfulDataEleventy = require('../src/utils/get-contentful-data-eleventy')

/* Get and render contentful data */

module.exports = async (args = {}) => {
  try {
    /* Output */

    return render({
      ...args,
      getContentfulData: getContentfulDataEleventy,
      getAudioDuration: async (url = '') => {
        try {
          const ffprobe = require('ffprobe')
          const ffprobeStatic = require('ffprobe-static')
          const util = require('node:util')
      
          const ffprobePromise = util.promisify(ffprobe)
          const duration = await ffprobePromise(`https:${url}`, { path: ffprobeStatic.path })
          const seconds = Math.round(duration.streams[0].duration)
      
          return seconds
        } catch (error) {
          console.error('Error getting audio duration: ', error)
      
          return 0
        }
      },
      onRenderEnd: ({ jsonData, serverlessRoutes = [] }) => {
        if (jsonData) {
          const jsonDataKeys = Object.keys(jsonData)

          for (let i = 0; i < jsonDataKeys.length; i++) {
            const json = jsonData[jsonDataKeys[i]]
      
            writeFile(`./src/json/${json.name}`, JSON.stringify(json.data, null, 2), (error) => {
              if (error) {
                console.error(`Error writing ${json.name} `, error)
                return
              }
      
              console.log(`Successfully wrote ${json.name}`)
            })
          }
        }
        
        if (serverlessRoutes.length) {
          for (let i = 0; i < serverlessRoutes.length; i++) {
            const path = serverlessRoutes[i]
            const pathDepth = path.match(/([/])/g) || []

            let serverlessPath = ''

            for (let j = 0; j < pathDepth.length; j++) {
              serverlessPath += '../'
            }

            const content = `import serverless from '${serverlessPath}src/serverless'; const render = async ({ request, env }) => { return await serverless({ request, env }) }; export const onRequest = [render];`

            mkdir(`./functions${path}`, { recursive: true }, (error) => {
              if (error) {
                console.error(`Error writing ./functions${path} `, error)
                return
              }
          
              writeFile(`./functions${path}index.js`, content, (err) => {
                if (err) {
                  console.error(`Error writing ./functions${path}index.js `, err)
                  return
                }
        
                console.log(`Successfully wrote ./functions${path}index.js`)
              })
            })
          }
        }
      }
    })
  } catch (error) {
    console.error('Error rendering site: ', error)

    return [{
      slug: '',
      output: ''
    }]
  }
}
