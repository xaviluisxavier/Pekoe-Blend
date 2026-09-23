let carrinho = JSON.parse(localStorage.getItem('carrinho_pekoe')) || [];

function processChas() {
  fetch('/chas')
    .then(res => res.json())
    .then(data => {
      const cha = document.getElementById('cha');
      cha.innerHTML = ''; 

      for (let i = 0; i < data.length; i++) {
        let id = data[i].chaid;
        let nome = data[i].nome;
        let preco = parseFloat(data[i].preco);
        let stock = parseInt(data[i].stock);
        let descricao = data[i].descricao;

        let total_favoritos = data[i].total_favoritos || 0; 

        let nomeFicheiro = (data[i].imagem && data[i].imagem !== "") ? data[i].imagem : "sem-imagem.png";
        let caminhoImagem = `../uploads/${nomeFicheiro}`;

        let botaoComprar = stock > 0 
            ? `<button onclick="adicionarAoCarrinho('${id}', '${nome}', ${preco}, '${caminhoImagem}', ${stock})" class="btn btn-success">Adicionar ao Carrinho</button>`
            : `<button disabled class="btn btn-default">Esgotado</button>`;

        let iconeEstrela = (data[i].eu_gostei === 1) ? '★' : '☆';
        
        let row = `
          <div class="card" style="margin-bottom: 20px; position: relative;">
            
            <div onclick="darFavorito('${id}', this)" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 5px 12px; border-radius: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); cursor: pointer; display: flex; align-items: center; gap: 5px; transition: transform 0.2s;">
                <span class="icone-estrela" style="color: #FFD700; font-size: 22px; line-height: 1;">${iconeEstrela}</span>
                <strong class="contador-favoritos" style="font-size: 16px; color: #333;">${total_favoritos}</strong>
            </div>

            <img src="${caminhoImagem}" alt="${nome}" width="400" height="266" style="object-fit: cover;">
            <h1>${nome}</h1>
            <p class="price">${preco.toFixed(2)} €</p>
            <p>${botaoComprar}</p>
            <button onclick="showDetail('${descricao}','${stock}','${nome}')" class="btn btn-info btn-sm">Detalhe</button>   
          </div>
        `;
        cha.innerHTML += row;
      }
      
      atualizarTabelaCarrinho();
    });
}

function salvarCarrinho() {
    localStorage.setItem('carrinho_pekoe', JSON.stringify(carrinho));
    atualizarTabelaCarrinho();
}

function adicionarAoCarrinho(id, nome, preco, imagem, stock) {
    let itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        if (itemExistente.quantidade < stock) {
            itemExistente.quantidade++;
        } else {
            alert("Não há mais stock disponível!");
            return;
        }
    } else {
        carrinho.push({ id, nome, preco, imagem, stock, quantidade: 1 });
    }
    
    salvarCarrinho();
    $('#cartModal').modal('show');
}

function atualizarTabelaCarrinho() {
    document.getElementById('cart-badge').innerText = carrinho.length;

    let tabela = document.getElementById('tabela-carrinho');
    let totalElemento = document.getElementById('total-carrinho');
    if (!tabela) return; 

    tabela.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        let totalItem = item.preco * item.quantidade;
        total += totalItem;
        tabela.innerHTML += `
            <tr>
                <td style="vertical-align: middle;"><img src="${item.imagem}" class="img-thumbnail" style="height: 50px; width: 50px; object-fit: cover;"></td>
                <td style="vertical-align: middle;">${item.nome}</td>
                <td style="vertical-align: middle;">${item.preco.toFixed(2)} €</td>
                <td style="vertical-align: middle;">
                    <input type="number" min="1" max="${item.stock}" value="${item.quantidade}" 
                           class="form-control" style="width: 70px;"
                           onchange="mudarQuantidade('${item.id}', this.value)">
                </td>
                <td style="vertical-align: middle;" class="text-success"><strong>${totalItem.toFixed(2)} €</strong></td>
                <td style="vertical-align: middle;">
                    <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho('${item.id}')">X</button>
                </td>
            </tr>
        `;
    });

    totalElemento.innerText = total.toFixed(2) + " €";
}

function mudarQuantidade(id, novaQtd) {
    let item = carrinho.find(item => item.id === id);
    if(item) {
        novaQtd = parseInt(novaQtd);
        if (novaQtd > item.stock) novaQtd = item.stock;
        if (novaQtd < 1) novaQtd = 1;
        item.quantidade = novaQtd;
        salvarCarrinho(); 
    }
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
    if(carrinho.length === 0) {
        $('#cartModal').modal('hide'); 
    }
}

function showDetail(desc, stock, nome) {
    document.getElementById('detalheNome').innerText = "Detalhe do Chá: " + nome;
    document.getElementById('detalheStock').innerText = stock;
    document.getElementById('detalheDesc').innerText = desc;
    $('#detailModal').modal('show');
}

function mostrarInfoPagamento(metodo) {
    let info = document.getElementById('infoPagamento');
    if(metodo === 'MBWay') info.innerHTML = "Faça o envio para o nº <strong>912 345 678</strong> e confirme no seu telemóvel.";
    else if(metodo === 'Transferencia') info.innerHTML = "Transfira para o IBAN: <strong>PT50 0000 0000 1234 5678 9012 3</strong>";
    else info.innerHTML = "Pagará em numerário ao transportador no momento da entrega.";
}

function finalizarCompra() {
  let rua = document.getElementById('ruaCliente').value;
  let cp = document.getElementById('cpCliente').value;
  let localidade = document.getElementById('localidadeCliente').value;
  let pagamento = document.getElementById('metodoPagamento').value;

  if (rua.trim() === "" || cp.trim() === "" || localidade.trim() === "") {
      alert("Preencha todos os campos da morada."); return;
  }
  if (carrinho.length === 0) {
      alert("O teu carrinho está vazio!"); return;
  }

  let dados = {
      produtos: carrinho,
      morada: rua + ", " + cp + " " + localidade,
      pagamento: pagamento
  };

  fetch('/efetuarCompra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
  })
  .then(res => res.json())
  .then(resposta => {
      if(resposta.erro) {
          alert("Erro: " + resposta.erro);
      } else {
          localStorage.removeItem('carrinho_pekoe');
          alert('Encomenda finalizada com sucesso!');
          window.location.reload(); 
      }
  })
  .catch(err => console.log('Erro:', err));
}

function darFavorito(chaid, elementoClicado) {
    elementoClicado.style.transform = "scale(1.2)";
    setTimeout(() => elementoClicado.style.transform = "scale(1)", 200);

    fetch('http://localhost:3000/toggleFavorito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chaid: chaid })
    })
    .then(res => res.json())
    .then(resposta => {
        if (resposta.erro) {
            Swal.fire({
                icon: 'info',
                title: 'Atenção',
                text: resposta.erro
            });
        } else {
            let icone = elementoClicado.querySelector('.icone-estrela');
            let contador = elementoClicado.querySelector('.contador-favoritos');
            let totalAtual = parseInt(contador.innerText);

            if (resposta.acao === 'adicionado') {
                icone.innerText = '★'; 
                contador.innerText = totalAtual + 1; 
            } else if (resposta.acao === 'removido') {
                icone.innerText = '☆'; 
                contador.innerText = totalAtual - 1; 
            }
        }
    })
    .catch(err => console.log('Erro ao dar favorito:', err));
}
