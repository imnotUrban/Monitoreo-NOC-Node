// Los datos de los entities irán a la db

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium', 
    high = 'high'
}

export interface LogEntityOptions{
    level : LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {

    public level : LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;


    constructor(options: LogEntityOptions){
        
        this.message = options.message
        this.level= options.level
        this.createdAt = options.createdAt = new Date()
        this.origin = options.origin

    }

    static fromJson = (json: string):LogEntity => {
        const {message, level, createdAt , origin} = JSON.parse(json)
        if (!message) throw new Error("Message is require")
        if (!level) throw new Error("Level is require")
        if (!createdAt) throw new Error("createdAt is require")

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        })
        return log
    }
}