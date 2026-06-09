async function buscarCEP() {

    const cep = document.getElementById("cep");
    const resultado = document.getElementById("resultado");

    
    if (cep.value == "") {
        resultado.innerHTML = "<p class='erro'>Digite um CEP!</p>";
        return;
    }

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep.value}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {
            resultado.innerHTML =
                "<p class='erro'>CEP não encontrado!</p>";
            return;
        }

        resultado.innerHTML = `
            <h3>Informações do CEP</h3>

            <p><strong>CEP:</strong> ${dados.cep}</p>
            <p><strong>Rua:</strong> ${dados.logradouro}</p>
            <p><strong>Bairro:</strong> ${dados.bairro}</p>
            <p><strong>Cidade:</strong> ${dados.localidade}</p>
            <p><strong>Estado:</strong> ${dados.uf}</p>
            <p><strong>DDD:</strong> ${dados.ddd}</p>
            <p><strong>Complemento:</strong> ${dados.complemento || "Não informado"}</p>
            <p><strong>Região:</strong> ${dados.regiao}</p>
            <p><strong>IBGE:</strong> ${dados.ibge}</p>
        `;

    } catch (erro) {
        resultado.innerHTML =
            "<p class='erro'>Erro ao consultar o CEP.</p>";
    }
}