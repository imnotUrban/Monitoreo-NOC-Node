interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}


type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

/**
 * 
 *  Revisa si el servicio en alguna url esta activo
 * 
 */
export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly succesCallback : SuccessCallback,
        private readonly errorCallback : ErrorCallback
    ){}


    async execute(url: string): Promise<boolean> {

        try {

            const req = await fetch(url)
            if (!req.ok)
                throw new Error(`Error on check service ${url}`)

            this.succesCallback()
            console.log(`${url } is ok`);
            return true;
        } catch (error) {
            console.log(`Error ${error}`);
            this.errorCallback(` ${error}`);
            return false;
        }
        

    }
}