var TV = /** @class */ (function () {
    function TV(modelo, fabricante, valor, resolucao, polegadas) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.resolucao = resolucao;
        this.polegadas = polegadas;
    }
    TV.prototype.descricao = function () {
        return "TV ".concat(this.modelo, " - ").concat(this.resolucao, ", ").concat(this.polegadas, "\" - ").concat(this.fabricante);
    };
    return TV;
}());
var Celular = /** @class */ (function () {
    function Celular(modelo, fabricante, valor, memoria) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.memoria = memoria;
    }
    Celular.prototype.descricao = function () {
        return "Celular ".concat(this.modelo, " - ").concat(this.memoria, "GB - ").concat(this.fabricante);
    };
    return Celular;
}());
var Bicicleta = /** @class */ (function () {
    function Bicicleta(modelo, fabricante, valor, aro) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.aro = aro;
    }
    Bicicleta.prototype.descricao = function () {
        return "Bicicleta ".concat(this.modelo, " - Aro ").concat(this.aro, " - ").concat(this.fabricante);
    };
    return Bicicleta;
}());
var Carrinho = /** @class */ (function () {
    function Carrinho() {
        this.produtos = [];
    }
    Carrinho.prototype.adicionar = function (produto) {
        this.produtos.push(produto);
        this.atualizarDisplay();
    };
    Carrinho.prototype.remover = function (index) {
        this.produtos.splice(index, 1);
        this.atualizarDisplay();
    };
    Object.defineProperty(Carrinho.prototype, "total", {
        get: function () {
            return this.produtos.reduce(function (soma, p) { return soma + p.valor; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Carrinho.prototype.atualizarDisplay = function () {
        var _this = this;
        var lista = document.getElementById("lista-carrinho");
        lista.innerHTML = "";
        this.produtos.forEach(function (produto, index) {
            var item = document.createElement("li");
            item.className = "list-group-item d-flex justify-content-between align-items-center";
            item.innerHTML = "\n        <div>".concat(produto.descricao(), " - <strong>R$ ").concat(produto.valor.toFixed(2), "</strong></div>\n        <button class=\"btn btn-sm btn-outline-danger\">\n          <i class=\"bi bi-trash\"></i>\n        </button>\n      ");
            var botao = item.querySelector("button");
            botao.addEventListener("click", function () { return _this.remover(index); });
            lista.appendChild(item);
        });
        document.getElementById("total").textContent = "Total: R$ ".concat(this.total.toFixed(2));
    };
    return Carrinho;
}());
var carrinho = new Carrinho();
var form = document.getElementById("produto-form");
var tipoSelect = document.getElementById("tipo-produto");
var camposEspecificos = document.getElementById("campos-especificos");
var tipoProduto = document.getElementById("tipo-produto");
function atualizarCamposEspecificos() {
    var tipoSelecionado = tipoProduto.value;
    var html = "";
    switch (tipoSelecionado) {
        case "tv":
            html = "\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <label for=\"resolucao\" class=\"form-label\">Resolu\u00E7\u00E3o</label>\n            <input type=\"text\" class=\"form-control\" id=\"resolucao\" required />\n          </div>\n          <div class=\"col-md-6\">\n            <label for=\"polegadas\" class=\"form-label\">Polegadas</label>\n            <input type=\"number\" class=\"form-control\" id=\"polegadas\" required />\n          </div>\n        </div>\n      ";
            break;
        case "celular":
            html = "\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <label for=\"memoria\" class=\"form-label\">Mem\u00F3ria (GB)</label>\n            <input type=\"number\" class=\"form-control\" id=\"memoria\" required />\n          </div>\n        </div>\n      ";
            break;
        case "bicicleta":
            html = "\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <label for=\"aro\" class=\"form-label\">Tamanho do aro</label>\n            <input type=\"number\" class=\"form-control\" id=\"tamanhoAro\" required />\n          </div>\n        </div>\n      ";
            break;
    }
    camposEspecificos.innerHTML = html;
}
tipoProduto.addEventListener("change", atualizarCamposEspecificos);
window.addEventListener("load", atualizarCamposEspecificos);
tipoSelect.addEventListener("change", atualizarCamposEspecificos);
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var modelo = document.getElementById("modelo").value;
    var fabricante = document.getElementById("fabricante").value;
    var valor = parseFloat(document.getElementById("valor").value);
    var tipo = tipoSelect.value;
    var produto;
    if (tipo === "tv") {
        var resolucao = document.getElementById("resolucao").value;
        var polegadas = parseInt(document.getElementById("polegadas").value);
        produto = new TV(modelo, fabricante, valor, resolucao, polegadas);
    }
    else if (tipo === "celular") {
        var memoria = parseInt(document.getElementById("memoria").value);
        produto = new Celular(modelo, fabricante, valor, memoria);
    }
    else {
        var aro = parseInt(document.getElementById("aro").value);
        produto = new Bicicleta(modelo, fabricante, valor, aro);
    }
    carrinho.adicionar(produto);
    form.reset();
    atualizarCamposEspecificos();
});
atualizarCamposEspecificos();
