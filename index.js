const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

const CHATS = require('./chats.json')
const PORT = process.env.PORT || 3000
const TELEGRAM_HOST = 'http://api.telegram.org'
const TELEGRAM_BOT_KEY = process.env.TELEGRAM_BOT_KEY

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

app.post('/new-message', function(req, res) {

  console.log(req.body)
  const { message } = req.body

  axios
    .post(
      `${TELEGRAM_HOST}/bot${TELEGRAM_BOT_KEY}/sendMessage`,
      {
        chat_id: message.chat.id,
        text: 'The Wheel weaves as The Wheel wills.'
      }
    )
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})

// Finally, start our server
app.listen(PORT, function() {
  console.log(`Telegram app listening on port ${PORT}!`)
})
