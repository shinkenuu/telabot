const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

// const client = require('./client')

// const CHATS = require('./chats.json')
const PORT = process.env.PORT || 3000
const TELEGRAM_BOT_KEY = process.env.TELEGRAM_BOT_KEY
const TELEGRAM_SEND_MESSAGE_URI = \
  `http://api.telegram.org/bot${TELEGRAM_BOT_KEY}/sendMessage`

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

app.post('/new-message', function(req, res) {
  const { message } = req.body
  console.log(message)

  const message = {
    chat_id: message.chat.id,
    text: 'The Wheel weaves as The Wheel wills.'
  }

  res.end('ok')

  axios.get(
    TELEGRAM_SEND_MESSAGE_URI + \
    `?chat_id=${message.chat_id}&text=${message.text}`)
    .then(response => {
      console.log(`Message ${message.text} sent to chat_id ${message.chat_id}`)
    })
    .catch(err => {
      console.error(err)
    })

})

// Finally, start our server
app.listen(PORT, function() {
  console.log(`Lewis Therin listening on port ${PORT}!`)
})
