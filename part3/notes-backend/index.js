const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')


//Starts the server with app.listen()
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})