

function verChas(){
    fetch('http://localhost:3000/chas')
    .then(res => res.json())
    .then(data => processTabela(data))
    
    .catch((err)=>{
        alert('Ocorreu um problema...')
        console.log(err)
    })
  }
  
  
  
  
      function processTabela(data){
        console.log(data)
        const cab = document.getElementById('cab1')
        cab.innerHTML+=`
            <thead>
                <tr>
                <th scope="col">Cha ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Preco</th>
                <th scope="col">Descrição</th>
                <th scope="col">Ações</th>
                </tr>
            </thead>
        `
        const tabela = document.getElementById('tabelachas')
        tabela.innerHTML=''
        for(var i=0; i<data.length;i++){
            let chaid = data[i].chaid
            let nome = data[i].nome
            let preco = data[i].preco
            let descricao = data[i].descricao
            
            
            let row = `<tr>
                        <td >${chaid}</td>
                        <td >${nome}</td>
                        <td>${preco+"$"}</td>
                        <td>${descricao}</td>
                        <td>
                  
                        <button onclick="showEditarChas('${data[i].chaid}','${data[i].nome}','${data[i].preco}','${data[i].descricao}')" type="button" class="btn btn-primary"><i class="glyphicon glyphicon-pencil"></i></button>
                      <button type="button" class="btn btn-danger"><i class="glyphicon glyphicon-remove"></i></button>
            </td>
                      
                       </tr>
                       `
            tabela.innerHTML += row
        }
    }

    function showEditarChas(id,nome,preco,desc){
    
        const editar = document.getElementById('editarcha')
        editar.innerHTML+= ''
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
                        
                          <div class="form-group col-md-6">
                            <label for="nomecha">Nome do Chá</label>
                            <input type="nomecha" class="form-control" id="nomecha" placeholder="Nome">
                            
                          </div>

                          <div class="form-group col-md-6">
                            <label for="preco">Preço</label>
                            <input type="preco" class="form-control" id="preco" placeholder="Preço">
                       
                          </div>
                       

                        <div class="form-group col-md-12">
                        <label for="descricao">Descrição</label>
                        <textarea class="form-control" id="descricao">${desc}</textarea>
                      </div>
                        
                      </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
          `
          document.body.append(modelWrap)
        var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
        modal.show()
        }
   