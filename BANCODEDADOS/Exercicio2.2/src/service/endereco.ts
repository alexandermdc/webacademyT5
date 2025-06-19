import axios from 'axios';

const form = document.getElementById('formEndereco') as HTMLFormElement;

form?.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const dados = {
    rua: (document.getElementById('rua') as HTMLInputElement).value,
    numero: (document.getElementById('numero') as HTMLInputElement).value,
    bairro: (document.getElementById('bairro') as HTMLInputElement).value,
    cidade: (document.getElementById('cidade') as HTMLInputElement).value,
    estado: (document.getElementById('estado') as HTMLInputElement).value,
    cep: (document.getElementById('cep') as HTMLInputElement).value,
  };

  try {
    const response = await axios.post('http://localhost:3550/enderecos', dados);
    alert('Endereço cadastrado com sucesso!');
    console.log(response.data);
    form.reset();
  } catch (error) {
    console.error('Erro ao cadastrar endereço:', error);
    alert('Erro ao cadastrar endereço.');
  }
});