const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(m => {
      m.connection.getClient()
      console.log(`MongoDB Connected: at ${m.connection.host}`)
    })
    
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB