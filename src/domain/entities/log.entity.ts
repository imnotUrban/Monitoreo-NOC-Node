// Los datos de los entities irán a la db

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium', 
    high = 'high'
}

export class LogEntity {

    public level : LogSeverityLevel;
    public message: string;
    public createdAt: Date;


    constructor(message: string, level: LogSeverityLevel){
        
        this.message = message
        this.level= level
        this.createdAt = new Date()

    }

    static fromJson = (json: string):LogEntity => {
        const {message, level, createdAt } = JSON.parse(json)
        if (!message) throw new Error("Message is require")
        if (!level) throw new Error("Level is require")
        if (!createdAt) throw new Error("createdAt is require")

        const log = new LogEntity(message, level)
        log.createdAt = new Date(createdAt)

        return log
    }
}