const { Message } = require("discord.js")

module.exports.Jommand = class Jommand {
    /**
     * Constructor
     * @param {String} prefix 
     */
    constructor(prefix) {
        this.prefix = prefix
        this.command = []
    }

    /**
     * 
     * @param {Command} cmd
     */
    createCommand(cmd) {
        this.command.push(cmd)
    }
    
    /**
     * 
     * @param {String} name 
     */
    removeCommand(name) {
        const idx = this.command.findIndex(function(item) {return item.name === name}) // findIndex = find + indexOf 
        if (idx > -1) this.command.splice(idx, 1)
    }

    getCommands() {
        return command
    }

    /**
     * 
     * @param {Message} message 
     */
    executeCommand(message) {
        this.command.forEach((elem) => {
            if(message.content.startsWith(this.prefix + elem.name))
                elem.execute(message)
        })
    }
}

class CommandContext {
    constructor(args, rawArgs) {
        this.args = args
        this.rawArgs = rawArgs
    }

    parseArgument(name) {
        return this.args.find((item) => {return item.argName === name}).parseData(this.rawArgs[this.args.findIndex((item) => {return item.argName === name}) + 1])
    }

}

module.exports.CommandContext = CommandContext

module.exports.Command = class Command {
    /**
     * 
     * @param {String} name 
     * @param {(msg: Message, ctx: CommandContext) => void} action
     * @param {Array<CommandArgument>} args
     */
    constructor(name, action, args) {
        this.name = name
        this.action = action
        this.args = args
        console.log(args)
    }

    /**
     * 
     * @param {Message} message 
     */
    execute(message) {
        let arr = message.content.split(' ')
        if(this.args != undefined) {
            if(this.args.length > arr.length - 1) {
                message.channel.send('명령어의 매개 변수가 잘못되었습니다. 명령어를 다시 확인해 주세요.')
            } else {
                let failed = false
                let whatIsFailed = new CommandArgument('none')
                for(let i = 0; i < arr.length; i++) {
                    if(arr[i + 1] === undefined || this.args[i] === undefined) {
                        break
                    }
                    failed = !this.args[i].checkValid(arr[i + 1])
                    if(failed) {
                        whatIsFailed = this.args[i]
                        break
                    }
                }
                if(failed) {
                    message.channel.send('명령어의 매개 변수 `' + whatIsFailed.argName + '`가 잘못되었습니다. 명령어를 다시 확인해 주세요.')
                } else {
                    this.action(message, new CommandContext(this.args, arr))
                }
            }
        } else {
            this.action(message, new CommandContext(undefined, undefined))
        }
    }
}

class CommandArgument {

    constructor(argName) {
        this.argName = argName
    }

    /**
     * 
     * @param {String} Raw data of the argument
     * @returns check is valid
     */
    checkValid(rawData) {
        return true
    }

    /**
     * 
     * @param {String} Raw data of the argument
     * @returns parse the raw data
     */
    parseData(rawData) {
        return rawData
    }

}

module.exports.CommandArgument = CommandArgument

class BooleanArgument extends this.CommandArgument {

    checkValid(rawData) {
        return (rawData === 'true' || rawData === 'false')
    }

    parseData(rawData) {
        return rawData === 'true' ? true : false
    }

}

module.exports.BooleanArgument = BooleanArgument

class IntArgument extends this.CommandArgument {

    checkValid(rawData) {
        try {
            parseInt(rawData)
            return true
        } catch (error) {
            return false
        }
    }

    parseData(rawData) {
        return parseInt(rawData)
    }

}

module.exports.IntArgument = IntArgument