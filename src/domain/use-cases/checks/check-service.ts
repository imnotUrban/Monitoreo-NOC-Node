import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}


type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

/**
 * 
 *  Revisa si el servicio en alguna url esta activo
 * 
 */
export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly succesCallback : SuccessCallback,
        private readonly errorCallback : ErrorCallback
    ){}


    async execute(url: string): Promise<boolean> {

        try {

            const req = await fetch(url)
            if (!req.ok)
                throw new Error(`Error on check service ${url}`)
            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low)
            this.logRepository.saveLog(log)
            this.succesCallback && this.succesCallback()
            console.log(`${url } is ok`);
            return true;
        } catch (error) {
            const errorString = `${url} is not ok. Error ${error}`;
            
            const log = new LogEntity(errorString, LogSeverityLevel.high)
            this.logRepository.saveLog(log)
            this.errorCallback && this.errorCallback(` ${error}`);
            return false;
        }
        

    }
}