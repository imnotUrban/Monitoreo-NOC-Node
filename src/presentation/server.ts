import { envs } from "../config/plugins/envs.plugin"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/logs/email/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log-implementation.repository"
import { CronService } from "./cron/cron-services"
import { EmailService } from "./email/email.service"

const fileSystemLogRepository  = new LogRepositoryImpl(
    new FileSystemDatasource()

)

const emailService = new EmailService()


export class ServerApp {
    public static start () {
        console.log("Servidor corriendo..." )
        console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
        /*
         -> Mandar mails
        */
        new SendEmailLogs(emailService, fileSystemLogRepository ).execute((['papo-papo.z@hotmail.cl', 'byforevercs@gmail.com']))
        // emailService.sendEmailWithFileSystemLogs(['papo-papo.z@hotmail.cl', 'byforevercs@gmail.com'])


        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         new CheckService(fileSystemLogRepository,
        //             () => console.log("Success"),
        //             (error) => console.log(error),
        //         ).execute('https://googssasasle.com')
        //     }
        //     )

    }




}