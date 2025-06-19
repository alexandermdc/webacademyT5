import axios from 'axios';

const form = document.getElementById('formCliente') as HTMLFormElement;

form?.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const dados = {
    nome: (document.getElementById('nome') as HTMLInputElement).value,
    cpf: (document.getElementById('cpf') as HTMLInputElement).value,
    telefone: (document.getElementById('telefone') as HTMLInputElement).value,
    email: (document.getElementById('email') as HTMLInputElement).value,
    data_nascimento: (document.getElementById('data_nascimento') as HTMLInputElement).value,
    id_endereco: parseInt((document.getElementById('id_endereco') as HTMLInputElement).value),
  };

  try {
    const response = await axios.post('http://localhost:3550/clientes', dados);
    alert('Cliente cadastrado com sucesso!');
    console.log(response.data);
    form.reset();
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    alert('Erro ao cadastrar cliente.');
  }
});
