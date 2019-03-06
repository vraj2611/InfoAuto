var Veiculo = /** @class */ (function () {
    function Veiculo(placa, fabricante, modelo, versao, ano_fabr, ano_mod, motor, cor, situacao, valor) {
        if (placa === void 0) { placa = ''; }
        if (fabricante === void 0) { fabricante = ''; }
        if (modelo === void 0) { modelo = ''; }
        if (versao === void 0) { versao = ''; }
        if (ano_fabr === void 0) { ano_fabr = 2000; }
        if (ano_mod === void 0) { ano_mod = 2000; }
        if (motor === void 0) { motor = ''; }
        if (cor === void 0) { cor = ''; }
        if (situacao === void 0) { situacao = ''; }
        if (valor === void 0) { valor = 0; }
        this.placa = placa;
        this.fabricante = fabricante;
        this.modelo = modelo;
        this.versao = versao;
        this.ano_fabr = ano_fabr;
        this.ano_mod = ano_mod;
        this.motor = motor;
        this.cor = cor;
        this.situacao = situacao;
        this.valor = valor;
    }
    return Veiculo;
}());
export { Veiculo };
//# sourceMappingURL=veiculo.js.map