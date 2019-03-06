import { ApiFipeService } from 'src/app/services/api-fipe.service';

export class Fabricante {

    constructor(
        public id: number,
        public name: string,
        public fipe_name: string,
        public key: string
    ) { }
}
