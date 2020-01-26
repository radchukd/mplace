const mongoose  = require('mongoose'),
      constants = require('../constants') 

const options = { timestamps: true }

const adSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: constants.categories },
    location: { type: String, required: true, enum: constants.locations },
    price: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: Buffer, required: true },
    views: { type: Number, default: 0 },
  },
  options
)

module.exports = Ad = mongoose.model('ad', adSchema)
