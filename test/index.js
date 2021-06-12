const { Jommand, Command } = require('../jommand')
const BooleanArgument = require('../jommand').BooleanArgument
const jommand = new Jommand('y!')
const discord = require('discord.js')
const client = new discord.Client()

jommand.createCommand(new Command('test', (msg, ctx) => {
    msg.channel.send('Hello, World! ' + (ctx.parse('arg1') + 1))
}), new BooleanArgument('arg1'))

client.on('message', (msg) => {
    jommand.executeCommand(msg)
})

client.login(require('./config.json').token)