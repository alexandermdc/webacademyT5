interface Produto {
  modelo: string;
  fabricante: string;
  valor: number;
  descricao(): string;
}

class TV implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public valor: number,
    public resolucao: string,
    public polegadas: number
  ) {}

  descricao(): string {
    return `TV ${this.modelo} - ${this.resolucao}, ${this.polegadas}" - ${this.fabricante}`;
  }
}

class Celular implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public valor: number,
    public memoria: number
  ) {}

  descricao(): string {
    return `Celular ${this.modelo} - ${this.memoria}GB - ${this.fabricante}`;
  }
}

class Bicicleta implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public valor: number,
    public aro: number
  ) {}

  descricao(): string {
    return `Bicicleta ${this.modelo} - Aro ${this.aro} - ${this.fabricante}`;
  }
}

class Carrinho<T extends Produto> {
  private produtos: T[] = [];

  adicionar(produto: T) {
    this.produtos.push(produto);
    this.atualizarDisplay();
  }

  remover(index: number) {
    this.produtos.splice(index, 1);
    this.atualizarDisplay();
  }

  get total(): number {
    return this.produtos.reduce((soma, p) => soma + p.valor, 0);
  }

  atualizarDisplay() {
    const lista = document.getElementById("lista-carrinho")!;
    lista.innerHTML = "";

    this.produtos.forEach((produto, index) => {
      const item = document.createElement("li");
      item.className = "list-group-item d-flex justify-content-between align-items-center";

      item.innerHTML = `
        <div>${produto.descricao()} - <strong>R$ ${produto.valor.toFixed(2)}</strong></div>
        <button class="btn btn-sm btn-outline-danger">
          <i class="bi bi-trash"></i>
        </button>
      `;

      const botao = item.querySelector("button")!;
      botao.addEventListener("click", () => this.remover(index));

      lista.appendChild(item);
    });

    document.getElementById("total")!.textContent = `Total: R$ ${this.total.toFixed(2)}`;
  }
}

const carrinho = new Carrinho<Produto>();

const form = document.getElementById("produto-form") as HTMLFormElement;
const tipoSelect = document.getElementById("tipo-produto") as HTMLSelectElement;
const camposEspecificos = document.getElementById("campos-especificos")!;

const tipoProduto = document.getElementById("tipo-produto") as HTMLSelectElement;

function atualizarCamposEspecificos() {
  const tipoSelecionado = tipoProduto.value;
  let html = "";

  switch (tipoSelecionado) {
    case "tv":
      html = `
        <div class="row">
          <div class="col-md-6">
            <label for="resolucao" class="form-label">Resolução</label>
            <input type="text" class="form-control" id="resolucao" required />
          </div>
          <div class="col-md-6">
            <label for="polegadas" class="form-label">Polegadas</label>
            <input type="number" class="form-control" id="polegadas" required />
          </div>
        </div>
      `;
      break;
    case "celular":
      html = `
        <div class="row">
          <div class="col-md-6">
            <label for="memoria" class="form-label">Memória (GB)</label>
            <input type="number" class="form-control" id="memoria" required />
          </div>
        </div>
      `;
      break;
    case "bicicleta":
      html = `
        <div class="row">
          <div class="col-md-6">
            <label for="aro" class="form-label">Tamanho do aro</label>
            <input type="number" class="form-control" id="tamanhoAro" required />
          </div>
        </div>
      `;
      break;
  }

  camposEspecificos.innerHTML = html;
}

tipoProduto.addEventListener("change", atualizarCamposEspecificos);
window.addEventListener("load", atualizarCamposEspecificos);


tipoSelect.addEventListener("change", atualizarCamposEspecificos);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const modelo = (document.getElementById("modelo") as HTMLInputElement).value;
  const fabricante = (document.getElementById("fabricante") as HTMLInputElement).value;
  const valor = parseFloat((document.getElementById("valor") as HTMLInputElement).value);
  const tipo = tipoSelect.value;

  let produto: Produto;

  if (tipo === "tv") {
    const resolucao = (document.getElementById("resolucao") as HTMLInputElement).value;
    const polegadas = parseInt((document.getElementById("polegadas") as HTMLInputElement).value);
    produto = new TV(modelo, fabricante, valor, resolucao, polegadas);
  } else if (tipo === "celular") {
    const memoria = parseInt((document.getElementById("memoria") as HTMLInputElement).value);
    produto = new Celular(modelo, fabricante, valor, memoria);
  } else {
    const aro = parseInt((document.getElementById("aro") as HTMLInputElement).value);
    produto = new Bicicleta(modelo, fabricante, valor, aro);
  }

  carrinho.adicionar(produto);
  form.reset();
  atualizarCamposEspecificos();
});

atualizarCamposEspecificos();
