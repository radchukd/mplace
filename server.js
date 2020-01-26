const app        = require('express')(),  
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser'),
      multer     = require('multer')().single('file')
      path       = require('path'),
      constants  = require('constants') 


require('dotenv').config()

const { DATABASE_URL, PORT } = process.env

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }).then(db => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(multer)

  //Routes
  app.get('/api/constants', (req, res) => {
    let data = {
      categories: constants.categories,
      locations: constants.locations
    }
    res.status(200).json(data)
  })

  app.use('/api/ad', require('./routes/ad'))

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }

  app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))
})
