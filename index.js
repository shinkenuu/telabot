const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

const CHATS = require('./chats.json')
const PORT = process.env.PORT || 3000
const TELEGRAM_BOT_KEY = process.env.TELEGRAM_BOT_KEY
const TELEGRAM_SEND_MESSAGE_URI = `http://api.telegram.org/bot${TELEGRAM_BOT_KEY}/sendMessage`

console.log(TELEGRAM_SEND_MESSAGE_URI)

const sendMessage = function (chat_id, text) {
  uriParams = `?chat_id=${chat_id}&text=${text}`

  return axios.get(
    TELEGRAM_SEND_MESSAGE_URI + uriParams
  )
  .then(response => {
    console.log(`Message '${message.text}' sent to chat_id ${message.chat_id}`)
  })
  .catch(err => {
    console.error(err)
  })
}

const findIntention = function (message) {
  console.log(`Message in findIntention: ${message}`)
  let intention = null;

  if(message.entities && message.entities.length > 0
    && message.entities[0].type === 'bot_command') {
      console.log('Command spotted!')
      intention = message.text.replace('/', '')
    }

  return intention;
}

const replyMessage = function (message) {
  if(message == undefined) {
    console.log('Message is undefined')
    return
  }

  console.log(`Message in replyMessage: ${message}`)
  const intention = findIntention(message)

  chat_id = message.chat.id
  text = CHATS[intention] || '*hums*'

  console.log(`Intention: ${intention}`)
  sendMessage(chat_id, text)
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.post('/new-message', function(req, res) {
  const { message } = req.body

  console.log(`Message in app.post: ${message}`)

  replyMessage(message)

  res.end('ok')

})

app.listen(PORT, function() {
  console.log(`Lewis Therin listening on port ${PORT}!`)
})
