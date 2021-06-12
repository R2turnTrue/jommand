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
        const idx = a.findIndex(function(item) {return item.name === name}) // findIndex = find + indexOf 
        if (idx > -1) a.splice(idx, 1)
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
    constructor(args) {
        this.args = args
    }

    parseArgument(name) {
        return this.args.find((item) => {return item.argName === name})
    }

}

module.exports.Command = class Command {
    /**
     * 
     * @param {String} name 
     * @param {(msg: Message, ctx: CommandContext) => void} action 
     */
    constructor(name, action) {
        this.name = name
        this.action = action
        this.args = []
        for (var i = 2; i < arguments.length; i++) {
            this.args.push(arguments[i])
        }
    }

    /**
     * 
     * @param {Message} message 
     */
    execute(message) {
        let arr = message.content.split(' ')
        arr.slice(1, arr.length)
        if(this.args.length > arr.length) {
            message.channel.send('명령어의 매개 변수가 잘못되었습니다. 명령어를 다시 확인해 주세요.')
        } else {
            let failed = false
            let whatIsFailed = new CommandArgument('none')
            for(let i = 0; i < arr.length; i++) {
                failed = !this.args[i].checkValid(arr[i])
                if(failed) {
                    whatIsFailed = this.args[i]
                    break
                }
            }
            if(failed) {
                message.channel.send('명령어의 매개 변수 `' + whatIsFailed.argName + '`가 잘못되었습니다. 명령어를 다시 확인해 주세요.')
            } else {
                this.action(new CommandContext(this.args))
            }
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
        return null
    }

}

module.exports.CommandArgument = CommandArgument

module.exports.BooleanArgument = class BooleanArgument extends this.CommandArgument {

    checkValid(rawData) {
        return (rawData === 'true' || rawData === 'false')
    }

    parseData(rawData) {
        return rawData === 'true' ? true : false
    }

}

module.exports.IntArgument = class IntArgument extends this.CommandArgument {

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