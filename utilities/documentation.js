const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Artist Search API',
      version: '1.0.0',
      description: 'A simple Node JS API built using Express jS middleware'
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ]
  },
  apis: ['./index.js']
}

module.exports = options
