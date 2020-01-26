const router = require('express').Router(),
      Ad     = require('../models/ad')

require('dotenv').config()

router.post('/index', (req, res) => {
  let query = {}
  const { title, category, location } = req.body

  if (title) { query.title = new RegExp(`.*${title}.*`, 'i') }
  if (category) { query.category = category }
  if (location) { query.location = location }

  Ad.find(query, '_id title description category location price email image views')
    .then((ads) => { res.status(200).send(ads) })
    .catch((err) => { res.status(500).json({ message: err.message }) })
})

router.post('/create', (req, res) => {
  ad = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    price: req.body.price,
    email: req.body.email,
    password: req.body.password,
    image: req.file.buffer,
    views: 0
  }

  Ad.create(ad)
    .then((ad) => { res.status(200).json({ id: ad._id }) })
    .catch((err) => { console.log(err); res.status(500).json({ message: err.message }) })
})

router.get('/show/:id', (req, res) => {
  Ad.findByIdAndUpdate(req.params.id, { $inc : { 'views' : 1 } }, { select: '_id title description category location price email image views' })
    .then((ad) => { res.status(200).send(ad) })
    .catch((err) => { res.status(500).json({ message: err.message }) })
})

router.post('/edit', (req, res) => {
  const { id, password } = req.body
  
  Ad.findOne({ _id: id, password: password }, '_id title description category location price email')
    .then((ad) => { 
      if (ad) { res.status(200).send(ad) }
      res.status(401).json({ message: 'password is incorrect' })
    })
    .catch((err) => { res.status(500).json({ message: err.message }) })
})

router.put('/update', (req, res) => {
  const { id } = req.body

  ad = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    price: req.body.price,
    email: req.body.email,
    password: req.body.password
  }

  
  Ad.findByIdAndUpdate(id, ad)
    .then(() => { res.status(200).json({ message: 'Ad was updated' }) })
    .catch((err) => { res.status(500).json({ message: err.message }) })
})

router.delete('/destroy', (req, res) => {
  const { id } = req.query

  Ad.findByIdAndDelete(id)
    .then(() => { res.status(200).json({ message: 'Ad was deleted' }) })
    .catch((err) => { res.status(500).json({ message: err.message }) })
})

module.exports = router
