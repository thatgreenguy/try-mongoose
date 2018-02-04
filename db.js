'use strict'
const config = require('config')
const mongoose = require('mongoose')

const logger = require('./logger')

const DB_URI = config.get('db.uri')
const DB_CONNECT_OPTIONS = config.get('db.connectionOptions')
const DB_RETRY_CONNECT_INTERVAL = config.get('db.retryConnectInterval')

function dbUp () {
  // console.log('DB Up - Starting App')
  logger.log.info('DB service up - App starting...')
}

function dbDown () {
  // console.log('DB Down - Wait and Retry')
  logger.log.error('DB service down - Wait and retry...')
  setTimeout(dbConnect, DB_RETRY_CONNECT_INTERVAL)
}

function dbConnect () {
  mongoose.connect(DB_URI, DB_CONNECT_OPTIONS)
    .then(dbUp)
    .catch(dbDown)
}

dbConnect()
