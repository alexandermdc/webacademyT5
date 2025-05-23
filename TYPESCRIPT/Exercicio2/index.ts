class Aluno {
  constructor(
    public id: number,
    public nomeCompleto: string,
    public idade: number,
    public altura: number,
    public peso: number
  ) {}
}

class Turma {
  private alunos: Aluno[] = [];
  constructor(public id: number, public nome: string) {}

  adicionarAluno(aluno: Aluno): void {
    this.alunos.push(aluno);
    this.atualizarDisplay();
  }

  editarAluno(id: number, novosDados: Partial<Omit<Aluno, "id">>): void {
    const aluno = this.alunos.find((a) => a.id === id);
    if (aluno) {
      if (novosDados.nomeCompleto) aluno.nomeCompleto = novosDados.nomeCompleto;
      if (novosDados.idade) aluno.idade = novosDados.idade;
      if (novosDados.altura) aluno.altura = novosDados.altura;
      if (novosDados.peso) aluno.peso = novosDados.peso;
    }
    this.atualizarDisplay();
  }

  apagarAluno(id: number): void {
    this.alunos = this.alunos.filter((a) => a.id !== id);
    this.atualizarDisplay();
  }

  getNumAlunos(): number {
    return this.alunos.length;
  }

  getMediaIdades(): number {
    return this.getNumAlunos() ? this.alunos.reduce((s, a) => s + a.idade, 0) / this.alunos.length : 0;
  }

  getMediaAlturas(): number {
    return this.getNumAlunos() ? this.alunos.reduce((s, a) => s + a.altura, 0) / this.alunos.length : 0;
  }

  getMediaPesos(): number {
    return this.getNumAlunos() ? this.alunos.reduce((s, a) => s + a.peso, 0) / this.alunos.length : 0;
  }

  atualizarDisplay(): void {
    const tabela = document.getElementById("tabelaAlunos")!;
    tabela.innerHTML = "";
    this.alunos.forEach((a) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${a.nomeCompleto}</td>
        <td>${a.idade}</td>
        <td>${a.altura.toFixed(2)} m</td>
        <td>${a.peso.toFixed(1)} kg</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editar(${a.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="apagar(${a.id})">Apagar</button>
        </td>
      `;
      tabela.appendChild(linha);
    });

    const estat = document.getElementById("estatisticas")!;
    estat.innerHTML = `
      <li class="list-group-item">Número de alunos: ${this.getNumAlunos()}</li>
      <li class="list-group-item">Média de idade: ${this.getMediaIdades().toFixed(2)} anos</li>
      <li class="list-group-item">Média de altura: ${this.getMediaAlturas().toFixed(2)} m</li>
      <li class="list-group-item">Média de peso: ${this.getMediaPesos().toFixed(1)} kg</li>
    `;
  }
}

// Código principal
const turma = new Turma(1, "Educação Física");

let proximoId = 1;

(document.getElementById("alunoForm") as HTMLFormElement).addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = (document.getElementById("nome") as HTMLInputElement).value;
  const idade = +(document.getElementById("idade") as HTMLInputElement).value;
  const altura = +(document.getElementById("altura") as HTMLInputElement).value;
  const peso = +(document.getElementById("peso") as HTMLInputElement).value;
  const idEdit = (document.getElementById("alunoId") as HTMLInputElement).value;

  if (idEdit) {
    turma.editarAluno(+idEdit, { nomeCompleto: nome, idade, altura, peso });
  } else {
    turma.adicionarAluno(new Aluno(proximoId++, nome, idade, altura, peso));
  }

  (document.getElementById("alunoForm") as HTMLFormElement).reset();
  (document.getElementById("alunoId") as HTMLInputElement).value = "";
});

// Funções globais para HTML acessar
(window as any).editar = function (id: number) {
  const aluno = (turma as any).alunos.find((a: Aluno) => a.id === id);
  (document.getElementById("alunoId") as HTMLInputElement).value = aluno.id;
  (document.getElementById("nome") as HTMLInputElement).value = aluno.nomeCompleto;
  (document.getElementById("idade") as HTMLInputElement).value = aluno.idade;
  (document.getElementById("altura") as HTMLInputElement).value = aluno.altura;
  (document.getElementById("peso") as HTMLInputElement).value = aluno.peso;
};

(window as any).apagar = function (id: number) {
  turma.apagarAluno(id);
};
