const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const PORT = 5000

const authRoutes = require('./routes/users')
const vaccineRoutes = require('./routes/vaccine')
const pediatricRoutes = require('./routes/pediatric')
const childrenRoutes = require('./routes/children')

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connection Success.')
  })
  .catch(err => {
    console.error('Mongo Connection Error', err)
  })

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  return res.send({
    error: false,
    message: 'Server is healthy'
  })
})

app.use('/users', authRoutes)
app.use('/vaccine', vaccineRoutes)
app.use('/pediatric', pediatricRoutes)
app.use('/children', childrenRoutes)

app.listen(PORT, () => {
  console.log('Server started listening on PORT : ' + PORT)
})
