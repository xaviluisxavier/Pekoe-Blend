
function processTabela() {

  fetch('http://localhost:3000/chas')
    .then(res => res.json())
    .then(data => {
      
      cab = document.getElementById('cab1')
      cab.innerHTML += `
                <thead>
               
                    <tr>

                    <th scope="col">Cha ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Preco</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Descrição</th>
                    <th scope="col"> 
                    <button type="button" onclick="adicionarChas()" class="btn btn-success">
                    <span class="glyphicon glyphicon-plus"></span>
                    </button>
                    </th>
                   
                    </tr>
                </thead>
            `
      const tabela = document.getElementById('tabelachas')
      tabela.innerHTML = ''
      for (var i = 0; i < data.length; i++) {
        let chaid = data[i].chaid
        let nome = data[i].nome
        let preco = data[i].preco
        let stock = data[i].stock
        let descricao = data[i].descricao
        


        let row = `<tr>
                            <td >${chaid}</td>
                            <td >${nome}</td>
                            <td>${preco + "$"}</td>
                            <td >${stock}</td>
                            <td>${descricao}</td>
                            
                            <td>
                      
                            <button onclick="showEditarChas('${data[i].chaid}','${data[i].nome}','${data[i].preco}','${data[i].stock}','${data[i].descricao}')" type="button" class="btn btn-primary"><i class="glyphicon glyphicon-pencil"></i></button>
                          <button onclick="removerCha('${data[i].chaid}','${data[i].nome}','${data[i].preco}','${data[i].stock}','${data[i].descricao}'),setInterval('atualizar()',500)" "type="button" class="btn btn-danger"><i class="glyphicon glyphicon-remove"></i></button>
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
function adicionarChas(){
  const editar = document.getElementById('editarcha')
  editar.innerHTML += ''
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
                        <form>

                        <div class="form-group col-md-4">
                            <label for="nomecha">Id do chá</label>
                            <textarea type="chaid" class="form-control" id="chaid"></textarea>
                          </div>
                        
                          <div class="form-group col-md-4">
                            <label for="nomecha">Nome do Chá</label>
                            <textarea type="nomecha" class="form-control" id="nomecha"></textarea>
                          </div>

                          <div class="form-group col-md-4">
                            <label for="preco">Preço</label>
                            <textarea type="preco" class="form-control" id="preco"></textarea>
                       
                          </div>
                          <div class="form-group col-md-4">
                            <label for="preco">Stock</label>
                            <textarea type="sotck" class="form-control" id="stock"></textarea>
                       
                          </div>
                       

                        <div class="form-group col-md-8">
                        <label for="descricao">Descrição</label>
                        <textarea type="descricao" class="form-control" id="descricao"></textarea>
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

function confirmarAddCha(){
  const chaid = document.getElementById('chaid').value
  if(chaid=='')
  alert('Tem de preencher o id do chá.')
  const nome = document.getElementById('nomecha').value
  if(nome=='')
  alert('Tem de preencher o nome.')
  const preco = document.getElementById('preco').value
  if(preco=='')
  alert('Tem de preencher o preço.')
  const stock = document.getElementById('stock').value
  if(stock=='')
  alert('Tem de preencher o stock.')
  const descricao = document.getElementById('descricao').value
  if(descricao=='')
  alert('Tem de preencher a descrição.')


  const obj = {
    chaid: chaid,
    nome: nome,
    preco: preco,
    stock: stock,
    descricao: descricao
  }
  console.log(obj)
  jsonObj = JSON.stringify(obj)


  var options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: jsonObj
  }


  fetch('http://localhost:3000/adicionarchas', options)
    .then(res => res.json())
    .then(data => alert('Chá adicionado com sucesso!'))
    .catch((err) => {
      console.log('Request failed', err.msg)
    });
}

function showEditarChas(id, nome, preco, stock, desc) {

  const editar = document.getElementById('editarcha')
  editar.innerHTML += ''
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
                            <label for="nomecha">Nome do Chá</label>
                            <textarea type="nomecha" class="form-control" id="nomecha">${nome}</textarea>
                          </div>

                          <div class="form-group col-md-4">
                            <label for="preco">Preço</label>
                            <textarea type="preco" class="form-control" id="preco">${preco}</textarea>
                       
                          </div>
                          <div class="form-group col-md-4">
                            <label for="preco">Stock</label>
                            <textarea type="sotck" class="form-control" id="stock">${stock}</textarea>
                       
                          </div>
                       

                        <div class="form-group col-md-12">
                        <label for="descricao">Descrição</label>
                        <textarea type="descricao" class="form-control" id="descricao">${desc}</textarea>
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
      console.log('Request failed', err.msg)
    });
}

function atualizar() {
  window.location.reload();
}


function confirmarEditCha(id) {
  const nome = document.getElementById('nomecha').value
  const preco = document.getElementById('preco').value
  const stock = document.getElementById('stock').value
  const descricao = document.getElementById('descricao').value

  const obj = {
    chaid: id,
    nome: nome,
    preco: preco,
    stock: stock,
    descricao: descricao
  }
  console.log(obj)
  jsonObj = JSON.stringify(obj)


  var options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: jsonObj
  }


  fetch('http://localhost:3000/update', options)
    .then(res => res.json())
    .then(data => alert('Chá alterádo com sucesso!'))
    .catch((err) => {
      console.log('Request failed', err.msg)
    });
}


