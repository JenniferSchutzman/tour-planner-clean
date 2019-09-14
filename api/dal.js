const { allDocs } = require('./lib/dal-helper')

const getTours = tours => allDocs(tours)

const dal = {
  getTours
}

module.exports = dal
