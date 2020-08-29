require('dotenv').config()
const axios = require('axios')

const { Client } = require('discord.js')

const client = new Client()


// client.on('ready',()=>{
//     client.send()
// })
const PREFIX = '$'
console.log('running')
client.on('message', (message) => {
    if (message.author.bot) return

    if (message.content.startsWith(PREFIX)) {
        const [CMD, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/)
        switch (CMD) {
            case 'send':
                switch (args[0]) {
                    case 'meme':
                        axios.get('https://meme-api.herokuapp.com/gimme')
                            .then((res) => {
                                message.channel.send('Here\'s a meme for you:\n', { files: [res.data.url] })
                            })
                            .catch(e => console.log(e))

                        break;
                    case 'fact':
                        axios.get('https://useless-facts.sameerkumar.website/api')
                            .then((res) => {
                                message.reply('Here\'s a fact for you:\n\n' + res.data.data)
                            })
                            .catch(e => console.log(e))
                        break;
                    case 'joke':
                        axios.get('https://official-joke-api.appspot.com/jokes/random')
                            .then((res) => {
                                message.reply('Here\'s a joke for you\n\n' + res.data.setup + '\n' + res.data.punchline)
                            })
                            .catch(e => console.log(e))
                        break;
                    default: message.channel.send(`cannot send ${args[0]}`)
                }
                break;
            case 'help':
                message.reply(`\n$send meme to send meme\n$send fact to send fact\n$send joke to send joke`)
                break;
            default: message.channel.send('Unknown command')
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN)

