function processTabelaUser() {
  fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
      
      cab = document.getElementById('cab')
      cab.innerHTML += `
     <thead>
     <tr>
     <th>User ID</th>
       <th>Nome User</th>
       <th>Email</th>
       <th>Ações</th>
 
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
              
            <button type="button" onclick="removerUser('${data[i].id}','${data[i].nome_user}','${data[i].email}','${data[i].senha}'),setInterval('atualizar()',500)"class="btn btn-danger"><i class="glyphicon glyphicon-remove"></i></button>
            </td>
          
                   </tr>
                   
                   `
        tabelaUser.innerHTML += row
      }
    })

    .catch((err) => {
      alert('Ocorreu um problema...')
      console.log(err)
    })
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
                  <button 
                  onclick="confirmarEditUser('${id}'),setInterval('atualizar()',1000)"
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


function atualizar(){
  window.location.reload();
}


function confirmarEditUser(id,senha) {
  const nome_user = document.getElementById('nomeuser').value
  const email = document.getElementById('email').value


  const obj = {
    id: id,
    nome_user: nome_user,
    email: email

  }
  console.log(obj)
  jsonObj = JSON.stringify(obj)


  var options = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json'
    },
    body: jsonObj
  }


  fetch('http://localhost:3000/updateuser', options)
    .then(res => res.json())
    .then(data => alert('User alterádo com sucesso!'))
    .catch((err) => {
      console.log('Request failed', err.msg)
    });
}

function removerUser(id, nome_user, email, senha) {


  const obj = {
    id: id,
    nome: nome_user,
    email: email,
    senha: senha
  }
  jsonObj = JSON.stringify(obj)


  var options = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    },
    body: jsonObj
  }


  fetch('http://localhost:3000/removeuser', options)
    .then(res => res.json())
    .then(data => alert('User removido com sucesso!'))

    .catch((err) => {
      console.log('Request failed', err.msg)
    });
}


