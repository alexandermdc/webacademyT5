const form = document.getElementById('formEndereco');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    rua: document.getElementById('rua').value,
    numero: document.getElementById('numero').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value,
    cep: document.getElementById('cep').value,
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
