
async function consultar() {
    const cpf = document.getElementById("cpfInput").value.trim();
    const res = document.getElementById("resultado");
    res.innerHTML = "Carregando...";

    const response = await fetch("../data/dados.json");
    const data = await response.json();
    const cliente = data.find(item => item.cpf === cpf);

    if (!cliente) {
        res.innerHTML = "CPF não encontrado.";
        return;
    }

    const hoje = new Date();
    const dataFim = new Date(cliente.dataFinal);
    const dataCredito = new Date(cliente.creditoFinal);

    let status = "";
    if (hoje <= dataFim) {
        const dias = Math.ceil((dataFim - hoje) / (1000 * 60 * 60 * 24));
        status = `Seguro ativo por mais ${dias} dias.`;
    } else if (hoje <= dataCredito) {
        const dias = Math.ceil((dataCredito - hoje) / (1000 * 60 * 60 * 24));
        status = `Crédito disponível: R$${cliente.valorPago}. Restam ${dias} dias.`;
    } else {
        status = "Seguro expirado e crédito não disponível.";
    }

    res.innerHTML = `
        <strong>Nome:</strong> ${cliente.nome}<br>
        <strong>Celular:</strong> ${cliente.nomeCelular}<br>
        <strong>IMEI:</strong> ${cliente.imei}<br>
        <strong>Valor pago:</strong> R$${cliente.valorPago}<br>
        <strong>Status:</strong> ${status}
    `;
}
