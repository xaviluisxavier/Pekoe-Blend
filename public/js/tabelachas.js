function processTabela() {
  fetch('http://localhost:3000/chas')
    .then(res => res.json())
    .then(data => {

      cab = document.getElementById('cab1')
      if (!document.getElementById('tabela-head')) {
        cab.innerHTML += `
                <thead id="tabela-head">
                    <tr>
                    <th>Cha ID</th>
                    <th>Nome</th>
                    <th>Preco</th>
                    <th>Stock</th>
                    <th>Descrição</th> 
                    <th>Imagem</th>
                    <th>
                    <button type="button" onclick="adicionarChas()" class="btn btn-success">
                    <span class="glyphicon glyphicon-plus"></span>
                    </button>
                    </th>
                    </tr>
                </thead>
            `
      }
      
      const tabela = document.getElementById('tabelachas')
      tabela.innerHTML = ''
      
      for (var i = 0; i < data.length; i++) {
        let chaid = data[i].chaid
        let nome = data[i].nome
        let preco = data[i].preco
        let stock = data[i].stock
        let descricao = data[i].descricao
        let imagem = data[i].imagem

        let nomeFicheiro = (imagem && imagem !== "") ? imagem : "sem-imagem.png";
        let caminhoImagem = `../uploads/${nomeFicheiro}`;

        let row = `<tr>
                            <td>${chaid}</td>
                            <td>${nome}</td>
                            <td>${preco + " €"}</td>
                            <td>${stock}</td>
                            <td>${descricao}</td>
                            <!-- 2. CORREÇÃO: Usar a tag <img> em vez de texto simples -->
                            <td><img src="${caminhoImagem}" alt="${nome}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; border: 1px solid #ccc;"></td>
                            <td>
                      
                            <button onclick="showEditarChas('${data[i].chaid}','${data[i].nome}','${data[i].preco}','${data[i].stock}','${data[i].descricao}')" type="button" class="btn btn-primary"><i class="glyphicon glyphicon-pencil"></i></button>
                          <button onclick="removerCha('${data[i].chaid}','${data[i].nome}','${data[i].preco}','${data[i].stock}','${data[i].descricao}'),setInterval('atualizar()',500)" type="button" class="btn btn-danger"><i class="glyphicon glyphicon-remove"></i></button>
                </td>
                           </tr>
                           `
        tabela.innerHTML += row
      }
    })
    .catch((err) => {
      alert('Ocorreu um problema...')
      console.log(err)
    })
}

function adicionarChas() {
  const editar = document.getElementById('editarcha')
  editar.innerHTML = ''
  modelWrap = document.createElement('div')
  modelWrap.innerHTML =
    `
          <div class="modal">
                    <div class="modal-dialog modal-l">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Adicionar um chá</h5>
                        </div>
                        <div class="modal-body" ">
                        <form id="formAdicionarCha">

                        <div class="form-group col-md-4">
                            <label for="chaid">Id do chá</label>
                            <textarea type="number" class="form-control" id="chaid" ></textarea>
                          </div>
                        
                          <div class="form-group col-md-4">
                            <label for="nomecha">Nome do Chá</label>
                            <textarea type="text" class="form-control" id="nomecha" ></textarea>
                          </div>

                          <div class="form-group col-md-4">
                            <label for="preco">Preço</label>
                            <textarea type="number" class="form-control" id="preco" ></textarea>
                       
                          </div>
                          <div class="form-group col-md-4">
                            <label for="stock">Stock</label>
                            <textarea type="text" class="form-control" id="stock" ></textarea>
                       
                          </div>

                          <div class="form-group col-md-8">
                           <label for="imagem">Escolher Imagem</label>
                           <input class="form-control" type="file" id="imagem" name="imagem">
                          </div>
                       

                        <div class="form-group col-md-12">
                        <label for="descricao">Descrição</label>
                        <textarea type="text" class="form-control" id="descricao" ></textarea>
                      </div>

                      
                      
                      </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button
                            onclick="confirmarAddCha(),setInterval('atualizar()',1000)"
                            type="button" class="btn btn-success" >Confirmar</button>
                        </div>
                        </div>
                    </div>
                    </div>
          `
  document.body.append(modelWrap)
  var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
  modal.show()
}

function confirmarAddCha() {
  const chaid = document.getElementById('chaid').value;
  const nome = document.getElementById('nomecha').value;
  const preco = document.getElementById('preco').value;
  const stock = document.getElementById('stock').value;
  const descricao = document.getElementById('descricao').value;
  const imagemInput = document.getElementById('imagem');

  if (!chaid || !nome || !preco) {
      Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Preencha pelo menos o ID, Nome e Preço!' });
      return;
  }

  const formData = new FormData();
  formData.append('chaid', chaid);
  formData.append('nome', nome);
  formData.append('preco', preco);
  formData.append('stock', stock);
  formData.append('descricao', descricao);
  
  if (imagemInput.files.length > 0) {
      formData.append('imagem', imagemInput.files[0]);
  }

  fetch('http://localhost:3000/adicionarchas', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
        // AGORA VERIFICA SE DEU ERRO!
        if (data.erro) {
            Swal.fire({ icon: 'error', title: 'Erro', text: data.erro });
        } else {
            $('#modalAddCha').modal('hide');
            Swal.fire({ 
                icon: 'success', 
                title: 'Adicionado!', 
                text: 'Chá adicionado com sucesso.', 
                timer: 2000, 
                showConfirmButton: false 
            }).then(() => {
                window.location.reload();
            });
        }
    })
    .catch((err) => {
        console.log('Request failed', err);
        Swal.fire({ icon: 'error', title: 'Erro de Ligação', text: 'Falha ao comunicar com o servidor.' });
    });
}

function showEditarChas(id, nome, preco, stock, desc) {
  const editar = document.getElementById('editarcha')
  editar.innerHTML = ''
  modelWrap = document.createElement('div')
  modelWrap.innerHTML =
    `
          <div class="modal">
                    <div class="modal-dialog modal-l">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editar o chá com o id: ${id}</h5>
                        </div>
                        <div class="modal-body" ">
                        <form>
                        
                          <div class="form-group col-md-4">
                            <label for="nomecha_edit">Nome do Chá</label>
                            <textarea type="text" class="form-control" id="nomecha_edit">${nome}</textarea>
                          </div>

                          <div class="form-group col-md-4">
                            <label for="preco_edit">Preço</label>
                            <textarea type="number" class="form-control" id="preco_edit">${preco}</textarea>
                       
                          </div>
                          <div class="form-group col-md-4">
                            <label for="stock_edit">Stock</label>
                            <textarea type="text" class="form-control" id="stock_edit">${stock}</textarea>
                       
                          </div>
                       
                        <div class="form-group col-md-12">
                        <label for="descricao_edit">Descrição</label>
                        <textarea type="text" class="form-control" id="descricao_edit">${desc}</textarea>
                      </div>

                      <div class="form-group col-md-8">
                      <label for="foto_edit">Nova Imagem do chá (Opcional)</label>
                      <input class="form-control" type="file" id="foto_edit">
                     </div>

                        
                      </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button
                            onclick="confirmarEditCha('${id}'),setInterval('atualizar()',1000)"
                            type="button" class="btn btn-success" >Confirmar</button>
                        </div>
                        </div>
                    </div>
                    </div>
          `
  document.body.append(modelWrap)
  var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
  modal.show()
}

function removerCha(id, nome, preco, stock, desc) {
  const obj = {
    chaid: id,
    nome: nome,
    preco: preco,
    stock: stock,
    descricao: desc
  }
  console.log(obj)
  jsonObj = JSON.stringify(obj)

  var options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    body: jsonObj
  }

  fetch('http://localhost:3000/remove', options)
    .then(res => res.json())
    .then(data => alert('Chá removido com sucesso!'))
    .catch((err) => {
      console.log('Request failed', err)
    });
}

function atualizar() {
  window.location.reload();
}

function confirmarEditCha(id) {
  const nome = document.getElementById('nomecha_edit').value;
  const preco = document.getElementById('preco_edit').value;
  const stock = document.getElementById('stock_edit').value;
  const descricao = document.getElementById('descricao_edit').value;
  
  const imagemInput = document.getElementById('foto_edit'); 

  const formData = new FormData();
  formData.append('chaid', id);
  formData.append('nome', nome);
  formData.append('preco', preco);
  formData.append('stock', stock);
  formData.append('descricao', descricao);
  
  if (imagemInput.files.length > 0) {
      formData.append('imagem', imagemInput.files[0]);
  }

  var options = {
    method: 'PUT',
    body: formData
  };

  fetch('http://localhost:3000/update', options)
    .then(res => res.json())
    .then(data => alert('Chá alterado com sucesso!'))
    .catch((err) => {
      console.log('Request failed', err);
    });
}