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


}

module.exports.Command = class Command {
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
            this.action(message, new CommandContext())
        }
    }
}

module.exports.CommandArgument = class CommandArgument {

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