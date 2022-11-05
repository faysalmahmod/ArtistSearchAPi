///////////////////////////////////////////////////////////////////////
/////////////////////////IMPORTING THE REQUIRED MODULES///////////////
/////////////////////////////////////////////////////////////////////

const express = require('express')
const fs = require('fs')
const converter = require('json-2-csv')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerDocumentation = require('./utilities/documentation')

// Initializing the express
const app = express()

///Initializing Swagger and setting documentation route
const specs = swaggerJsDoc(swaggerDocumentation)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

/////////READING THE DATA FROM JSON///////////////
const data = fs.readFileSync('./data/Input/artists.json')
const artists = JSON.parse(data) ////////////// Parsing JSON string and constructing the JavaScript object described by the string.

const newData = [] ////////array used to store random artists if the searched artist is not found.

/////////////////////////////////////////////////
///////////GET REQUESTS TO READ DATA ///////////
///////////////////////////////////////////////

/**
 *@swagger
 * /:
 *  get:
 *      description: Welcome page to API
 */

app.get('/', (req, res) => {
  res.send('Welcome to REST API for Artist Search!')
})

/**
 *@swagger
 * /artists/{name}/output_file/{filename}:
 *  get:
 *      description: Use to search Artist from Artist data and saving into CSV file whose name will be provided by User.If no matching Artist is found it will return random Artist name
 *      parameters:
 *          - name: name
 *            in: path
 *            description: The name of Artist to search
 *            required: true
 *          - name: filename
 *            in: path
 *            description: The name of CSV file to store search result in
 *            required: true
 *      responses:
 *          '200':
 *            description: Artist found and successfully saved in CSV file
 *          '400':
 *            description : Unable to Generate CSV.
 *          '202':
 *            description : Searched Artist is not available in data.A radom list of Artists generated.
 */

//////////Route to get required artist via csv file////////
app.get('/artists/:name/output_file/:filename', (req, res) => {
  try {
    const found = artists.find(
      art => art.name.toLowerCase() === req.params.name.toLowerCase()
    ) ///////Searching for artist via name matching retrieved through URL provided by user

    if (found) {
      /////////if Artist with required named is found
      ///////////Function to generate csv from filtered result//////
      converter.json2csv(found, (err, csv) => {
        if (err) {
          res.status(400).send('Unable to generate CSV file.')
        }
        fs.writeFileSync('./data/output/' + req.params.filename + '.csv', csv) //Writing the generated csv data to user specified csv filename.
        //New search will result in deletion of previos artist data.It could also be preserved usng CSVWriter middleware.
        res
          .status(200)
          .send(
            'Successfully Generated CSV file.Please Checkout in Output folder.'
          )
      })
    } else {
      /////////if Artist with required named is not found
      const target = artists[Math.floor(Math.random() * artists.length)].name /////Retreiving random artists from JSON

      if (!newData.includes(target)) {
        newData.push(target) //////Adding Random artists to an array to display options of available artists
      }
      res.status(202).send(newData) ////Displaying Random Artists
    }
  } catch (error) {
    return res.status(500).send('Some error has occured')
  }
})
///////////////////////////////////////////////
///////// App listening on the below port/////
/////////////////////////////////////////////
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.')
})
