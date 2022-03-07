

function verTabelaUser() {
  fetch('http://localhost:3000/tabela')
    .then(res => res.json())


    .then(data => processTabelaUser(data))

    .catch((err) => {
      alert('Ocorreu um problema...')
      console.log(err)
    })
}


function processTabelaUser(data) {
  console.log(data)

  const cab = document.getElementById('cab')
  cab.innerHTML += `
  
    <thead>
    <tr>
    <th scope="col">User ID</th>
      <th scope="col">Nome User</th>
      <th scope="col">Email</th>
      <th scope="col">Ações</th>

    </tr>
  </thead>
    `
  const tabelaUser = document.getElementById('tabelaUser')
  tabelaUser.innerHTML = ''
  for (var i = 0; i < data.length; i++) {
    let id = data[i].id
    let nome_user = data[i].nome_user
    let email = data[i].email



    let row = `<tr>
        <td>${id}</td>

                    <td>${nome_user}</td>
                    <td>${email}</td>
                    
                    <td>
                    <button onclick="showEditarUsers('${data[i].id}','${data[i].nome_user}','${data[i].email}')" type="button" class="btn btn-primary"><i class="glyphicon glyphicon-pencil"></i></button>
              
            <button type="button" class="btn btn-danger"><i class="glyphicon glyphicon-remove"></i></button>
            </td>
          
                   </tr>
                   
                   `
    tabelaUser.innerHTML += row
  }
}

function showEditarUsers(id, nome, email) {

  const editaruser = document.getElementById('editaruser')
  editaruser.innerHTML += ''
  modelWrap = document.createElement('div')
  modelWrap.innerHTML =
    `
    <div class="modal">
              <div class="modal-dialog modal-l">
                  <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">Editar o User com o id: ${id}</h5>
                  </div>

                  <div class="modal-body" ">

                  <div class="form-group col-md-6">
                  <label for="nomeuser">Nome do User</label>
                  <textarea type="nomeuser" class="form-control" id="nomeuser">${nome}</textarea>
                </div>

                <div class="form-group col-md-6">
                  <label for="preco">Email</label>
                  <textarea type="email" class="form-control" id="email">${email}</textarea>
                </div>
             
                  </div>
                  <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                  <button type="button" class="btn btn-success" >Confirmar</button>
                  </div>
                  </div>
              </div>
              </div>
    `
  document.body.append(modelWrap)
  var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
  modal.show()
}
