const { Jommand, Command, BooleanArgument, IntArgument } = require('../jommand')
const jommand = new Jommand('y!')
const discord = require('discord.js')
const client = new discord.Client()

jommand.createCommand(new Command('test', (msg, ctx) => {
    console.log(ctx.parseArgument('arg1'))
    msg.channel.send(`boolarg: ${ctx.parseArgument('arg1')}, intarg: ${ctx.parseArgument('arg2')}`)
}, [new BooleanArgument('arg1'), new IntArgument('arg2')]))

client.on('message', (msg) => {
    jommand.executeCommand(msg)
})

client.login(require('./config.json').token)