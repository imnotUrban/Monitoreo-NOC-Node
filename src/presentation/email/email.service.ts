import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

interface SendMailOptions{
    to: string| string[],
    subject: string,
    htmlBody: string,
    attachments: Attachment[]
}

interface Attachment {
    filename: string,
    path: string
}
//TODO: Adjunto -> Attachments


/**
 * Patrón adaptador usado para enviar los mails a través de gmail
 */
export class EmailService {
    private transporter = nodemailer.createTransport({
        service:envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    })

    constructor(


    ){}

    async sendEmail(options : SendMailOptions): Promise<boolean>{

        const {to, subject, htmlBody, attachments = []} = options

        try{

            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })

            // console.log(sentInformation);

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'Email.service.ts'
            })
            return true
        }catch(error){
            // console.log("Error al enviar correo");
            // console.log(error);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email not sent',
                origin: 'Email.service.ts'
            })
            return false

        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'logs del servidor'
        const htmlBody = `<h1>Envío de logs de servicio </h1>
        <p>Estimado/a,</p>
        <p>Se adjuntan los logs de servicio</p>
        `
        const attachments: Attachment[] = [
            {filename: 'logs-low.log', path: './logs/logs-low.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
        ]

        return this.sendEmail({to, subject, attachments, htmlBody})


    }
}