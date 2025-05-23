var Aluno = /** @class */ (function () {
    function Aluno(id, nomeCompleto, idade, altura, peso) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
    return Aluno;
}());
var Turma = /** @class */ (function () {
    function Turma(id, nome) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }
    Turma.prototype.adicionarAluno = function (aluno) {
        this.alunos.push(aluno);
        this.atualizarDisplay();
    };
    Turma.prototype.editarAluno = function (id, novosDados) {
        var aluno = this.alunos.find(function (a) { return a.id === id; });
        if (aluno) {
            if (novosDados.nomeCompleto)
                aluno.nomeCompleto = novosDados.nomeCompleto;
            if (novosDados.idade)
                aluno.idade = novosDados.idade;
            if (novosDados.altura)
                aluno.altura = novosDados.altura;
            if (novosDados.peso)
                aluno.peso = novosDados.peso;
        }
        this.atualizarDisplay();
    };
    Turma.prototype.apagarAluno = function (id) {
        this.alunos = this.alunos.filter(function (a) { return a.id !== id; });
        this.atualizarDisplay();
    };
    Turma.prototype.getNumAlunos = function () {
        return this.alunos.length;
    };
    Turma.prototype.getMediaIdades = function () {
        return this.getNumAlunos() ? this.alunos.reduce(function (s, a) { return s + a.idade; }, 0) / this.alunos.length : 0;
    };
    Turma.prototype.getMediaAlturas = function () {
        return this.getNumAlunos() ? this.alunos.reduce(function (s, a) { return s + a.altura; }, 0) / this.alunos.length : 0;
    };
    Turma.prototype.getMediaPesos = function () {
        return this.getNumAlunos() ? this.alunos.reduce(function (s, a) { return s + a.peso; }, 0) / this.alunos.length : 0;
    };
    Turma.prototype.atualizarDisplay = function () {
        var tabela = document.getElementById("tabelaAlunos");
        tabela.innerHTML = "";
        this.alunos.forEach(function (a) {
            var linha = document.createElement("tr");
            linha.innerHTML = "\n        <td>".concat(a.nomeCompleto, "</td>\n        <td>").concat(a.idade, "</td>\n        <td>").concat(a.altura.toFixed(2), " m</td>\n        <td>").concat(a.peso.toFixed(1), " kg</td>\n        <td>\n          <button class=\"btn btn-sm btn-warning\" onclick=\"editar(").concat(a.id, ")\">Editar</button>\n          <button class=\"btn btn-sm btn-danger\" onclick=\"apagar(").concat(a.id, ")\">Apagar</button>\n        </td>\n      ");
            tabela.appendChild(linha);
        });
        var estat = document.getElementById("estatisticas");
        estat.innerHTML = "\n      <li class=\"list-group-item\">N\u00FAmero de alunos: ".concat(this.getNumAlunos(), "</li>\n      <li class=\"list-group-item\">M\u00E9dia de idade: ").concat(this.getMediaIdades().toFixed(2), " anos</li>\n      <li class=\"list-group-item\">M\u00E9dia de altura: ").concat(this.getMediaAlturas().toFixed(2), " m</li>\n      <li class=\"list-group-item\">M\u00E9dia de peso: ").concat(this.getMediaPesos().toFixed(1), " kg</li>\n    ");
    };
    return Turma;
}());
// Código principal
var turma = new Turma(1, "Educação Física");
var proximoId = 1;
document.getElementById("alunoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = document.getElementById("nome").value;
    var idade = +document.getElementById("idade").value;
    var altura = +document.getElementById("altura").value;
    var peso = +document.getElementById("peso").value;
    var idEdit = document.getElementById("alunoId").value;
    if (idEdit) {
        turma.editarAluno(+idEdit, { nomeCompleto: nome, idade: idade, altura: altura, peso: peso });
    }
    else {
        turma.adicionarAluno(new Aluno(proximoId++, nome, idade, altura, peso));
    }
    document.getElementById("alunoForm").reset();
    document.getElementById("alunoId").value = "";
});
// Funções globais para HTML acessar
window.editar = function (id) {
    var aluno = turma.alunos.find(function (a) { return a.id === id; });
    document.getElementById("alunoId").value = aluno.id;
    document.getElementById("nome").value = aluno.nomeCompleto;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("altura").value = aluno.altura;
    document.getElementById("peso").value = aluno.peso;
};
window.apagar = function (id) {
    turma.apagarAluno(id);
};
