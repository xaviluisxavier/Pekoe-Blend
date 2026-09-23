function processEncomendas() {
    fetch('/encomendas')
      .then(res => res.json())
      .then(data => {
        const tabela = document.getElementById('tabelaEncomendas');
        tabela.innerHTML = ''; 
  
        for (let i = 0; i < data.length; i++) {
          let id = data[i].id;
          let nome_cha = data[i].nome_cha ? data[i].nome_cha : "Chá Apagado";
          let quantidade = data[i].quantidade;
          let morada = data[i].morada;
          let pagamento = data[i].metodo_pagamento;
          let estado = data[i].estado || 'Pendente'; 
          
          let dataFormatada = new Date(data[i].data_compra).toLocaleString('pt-PT');

          let corEstado = 'label-warning'; // Amarelo
          if (estado === 'Enviada') corEstado = 'label-success'; // Verde
          if (estado === 'Cancelada' || estado === 'Devolvida') corEstado = 'label-danger'; // Vermelho

          let selectDesign = `
            border: 1px solid #ced4da; 
            border-radius: 20px; 
            padding: 4px 12px; 
            font-size: 12px; 
            font-weight: bold; 
            color: #495057; 
            background-color: #f8f9fa; 
            cursor: pointer; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            outline: none;
          `;

          let row = `
            <tr>
                <td style="vertical-align: middle;"><strong>#${id}</strong></td>
                <td style="vertical-align: middle;">${dataFormatada}</td>
                <td style="vertical-align: middle;">${nome_cha}</td>
                <td style="vertical-align: middle;">${quantidade} un.</td>
                <td style="vertical-align: middle;">${morada}</td>
                <td style="vertical-align: middle;"><span class="label label-default" style="font-size: 12px;">${pagamento}</span></td>
                
                <!-- Aqui está a correção (label em vez de badge) -->
                <td style="vertical-align: middle;"><span class="label ${corEstado}" style="padding: 6px 10px; font-size: 12px;">${estado}</span></td>
                
                <td style="vertical-align: middle;">
                    <select style="${selectDesign}" onchange="alterarEstado(${id}, this.value)">
                        <option value="" disabled selected>✎ Alterar...</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Enviada">Enviada</option>
                        <option value="Cancelada">Cancelada</option>
                        <option value="Devolvida">Devolvida</option>
                    </select>
                </td>
            </tr>
          `;
          tabela.innerHTML += row;
        }
      })
      .catch((err) => console.log('Ocorreu um problema ao carregar encomendas:', err));
}
function alterarEstado(id, novoEstado) {
    if (!novoEstado) return;

    fetch('/updateestado', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, estado: novoEstado })
    })
    .then(res => res.json())
    .then(resposta => {
        if(resposta.erro) {
            alert("Erro: " + resposta.erro);
        } else {
            processEncomendas(); 
        }
    })
    .catch(err => console.log('Erro na requisição:', err));
}
