export class Veiculo {

    constructor(
        public placa:String = '',
        public fabricante:String = '',
        public modelo:String = '',
        public versao:String = '',
        public ano_fabr:Number = 2000,
        public ano_mod:Number = 2000,
        public motor:String = '',
        public cor:String = '',
        public situacao:String = '',
        public valor:Number = 0
    ){}

}
