import { LogDatasource } from "../../domain/datasources/log.datasourse";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'
export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = "logs/"
    private readonly allLogsPath = "logs/logs-low.log"
    private readonly mediumLogsPath = "logs/logs-medium.log"
    private readonly highLogsPath = "logs/logs.high.log"
    

    // Al crear con el constructor, verifica si existe la carpeta logs
    constructor(){
        this.createLogsFiles()
    }

    /**
     * Si no existe el path de los logs, los crea
     */
    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }
        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach( path => {
            if(!fs.existsSync(path)){
                fs.writeFileSync(path, "")
            }
        })

    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)} \n`

        fs.appendFileSync(this.allLogsPath, logAsJson)

        if(newLog.level === LogSeverityLevel.low) return;

        if(newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath,logAsJson )
        };

        if(newLog.level === LogSeverityLevel.high){
            fs.appendFileSync(this.highLogsPath,logAsJson )
        };


    }

    private getLogsFromFilee = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8')

        const logs = content.split('\n').map(
            LogEntity.fromJson)

        return logs

    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFilee(this.allLogsPath)
            
            case LogSeverityLevel.medium:
                return this.getLogsFromFilee(this.mediumLogsPath)
            
            case LogSeverityLevel.high:
                return this.getLogsFromFilee(this.highLogsPath)
            default:
                throw new Error(`${severityLevel} not implemented`)
            
        }
    }
}