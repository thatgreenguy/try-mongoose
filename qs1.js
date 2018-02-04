#!/usr/bin/env node
const mongoose = require('mongoose')

const mongoUri = 'mongodb://localhost/'
const mongoConnectOptions = {
  // useMongoClient: true, * Deprecated in latest versions
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}

process.on('SIGTERM', () => {
  console.info('Process received : SIGTERM')
})

mongoose.connect(mongoUri, mongoConnectOptions).then(
  () => { console.log('MongoDB Connected and Ready for use') },
  err => {
    console.log('MongoDB connection failed :: ' + err)
    process.exit(1)
  }
)

console.error('Oops an error')

const db = mongoose.connection

db.on('disconnected', console.error.bind(console, 'MongoDB disconnected:'))
db.on('connected', console.error.bind(console, 'MongoDB connected:'))
db.on('connecting', console.error.bind(console, 'MongoDB connecting:'))
db.on('disconnecting', console.error.bind(console, 'MongoDB disconnecting:'))
db.on('reconnectFailed', console.error.bind(console, 'MongoDB reconnect failed:'))
db.once('open', function () {
  console.log('MongoDB connected')
})

// var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/test')
//
// var db = mongoose.connection
//
// db.on('error', console.error.bind(console, 'connection error'))
// db.once('open', function (callback) {
//   console.log('Connection succeeded.')
// })
//
// var Schema = mongoose.Schema
//
// var bugSchema = new Schema({
//   bugName: String,
//   bugColour: String,
//   Genus: String
// })
//
// var Bug = mongoose.model('Bug', bugSchema)
//
// var Bee = new Bug({
//   bugName: 'Scruffy',
//   bugColour: 'Orange',
//   Genus: 'Bombus'
// })
//
// Bee.save(function (error) {
//   console.log('Your bee has been saved!')
//   if (error) {
//     console.error(error)
//   }
// })

// const dbUri = 'mongodb://localhost/'
// const dbConnectOptions = {
//   autoIndex: true, // Good for Dev not Production
//   reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//   reconnectInterval: 500, // Reconnect every 500ms - After initial connection!
//   poolSize: 10, // Default 5 - Maintain up to 10 socket connections
//   bufferMaxEntries: 0 // Errors immediately when DB connection down - no buffering
// }

const DB_RETRY_CONNECT_INTERVAL = 10000
