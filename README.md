# Jommand
JS Command Library like discordpy.ext (with Discord.JS)
- Referenced some structure of [monun/kommand](https://github.com/monun/kommand)

## Example Code

### Example
```js
// Import Jommand
const { Jommand, Command, BooleanArgument, IntArgument, CommandArgument } = require('../jommand')
// Jommand Init
const jommand = new Jommand('y!' /* prefix */)
const discord = require('discord.js')
const client = new discord.Client()

// Register command
// Use CommandArgument for String Argument
jommand.createCommand(new Command('test', (msg, ctx) => {
    // Excepted output
    // Input: y!test true 7777 hello_world!
    // Output: 
    msg.channel.send(`boolarg: ${ctx.parseArgument('arg1')}, intarg: ${ctx.parseArgument('arg2')}, stringarg: ${ctx.parseArgument('arg3')}`)
}, [new BooleanArgument('arg1'), new IntArgument('arg2'), new CommandArgument('arg3')]))

// Remove
// jommand.removeCommand('test')

client.on('message', (msg) => {
    // bind Jommand to event handler
    jommand.executeCommand(msg)
})

client.login(require('./config.json').token)
```

### Custom Argument

```js
// ...
class HobulhoArgument extends CommandArgument {

    checkValid(rawData) {
        return (rawData === 'mintchoco' || rawData === 'pineapplePizza')
    }

    parseData(rawData) {
        // Excepted output
        // Input: ... mintchoco ...
        // Output: false
        // Input: ... pineapplePizza ...
        // Output: true
        // Input: ... greentea ...
        // Output: (ERROR: UNEXCEPTED ARGUMENT)

        return rawData === 'mintchoco' ? false : true
    }

}
// ...
```