

function verTabelaUser(){
    fetch('http://localhost:3000/tabela')
    .then(res => res.json())
   
    
    .then(data => processTabelaUser(data))
    
    .catch((err)=>{
        alert('Ocorreu um problema...')
        console.log(err)
    })
  }


function processTabelaUser(data){
    console.log(data)
  
    const cab = document.getElementById('cab1')
    cab.innerHTML+=`
  
    <thead>
    <tr>
      <th scope="col">Nome User</th>
      <th scope="col">Email</th>
      <th scope="col">Senhas</th>
      <th scope="col">Ações</th>

    </tr>
  </thead>
    `
    const tabelaUser = document.getElementById('tabelaUser')
    tabelaUser.innerHTML=''
    for(var i=0; i<data.length;i++){
        
        let Nomeuser = data[i].Nomeuser
        let Email = data[i].Email
        let Senha = data[i].Senha
        
        
        let row = `<tr>
                    <td>${Nomeuser}</td>
                    <td>${Email}</td>
                    <td>${Senha}</td>
                    <td>
                    <button type="button" class="btn btn-primary"><i class="far fa-eye"></i>Editar</button>
              <button type="button" class="btn btn-success"><i class="fas fa-edit"></i>Adicionar</button>
            <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i>Remover</button>
            </td>
                   </tr>
                   `
        tabelaUser.innerHTML += row
    }
}

