import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log-implementation.repository"
import { CronService } from "./cron/cron-services"

const fileSystemLogRepository  = new LogRepositoryImpl(
    new FileSystemDatasource()
)


export class ServerApp {
    public static start () {
        console.log("Servidor corriendo..." )


        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(fileSystemLogRepository,
                    () => console.log("Success"),
                    (error) => console.log(error),
                ).execute('https://googssasasle.com')
            }
            )

    }




}