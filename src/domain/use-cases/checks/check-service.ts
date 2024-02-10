interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}
/**
 * 
 *  Revisa si el servicio en alguna url esta activo
 * 
 */
export class CheckService implements CheckServiceUseCase {

    async execute(url: string): Promise<boolean> {

        try {

            const req = await fetch(url)
            if (!req.ok)
                throw new Error(`Error on check service ${url}`)

            console.log(`${url } is ok`);
        } catch (error) {
            console.log(`Error ${error}`);
        }

        return true

    }
}