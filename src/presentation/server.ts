import { CheckService } from "../domain/use-cases/checks/check-service"
import { CronService } from "./cron/cron-services"




export class ServerApp {
    public static start () {
        console.log("Servidor corriendo..." )


        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    () => console.log("Success"),
                    (error) => console.log(error),
                ).execute('https://google.com')
            }
            )

    }




}