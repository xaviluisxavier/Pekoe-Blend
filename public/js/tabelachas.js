

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
        const cab = document.getElementById('cab')
        cab.innerHTML+=`
            <thead border="1">
                <tr>
                <th scope="col">Nome</th>
                <th scope="col">Preco</th>
                <th scope="col">Descrição</th>
                <th scope="col">Ações</th>
                </tr>
            </thead>
        `
        const tabela = document.getElementById('tabela')
        tabela.innerHTML=''
        for(var i=0; i<data.length;i++){
            let Nome = data[i].Nome
            let Preco = data[i].Preco
            let Descricao = data[i].Descricao
            
            
            let row = `<tr>
                        <td >${Nome}</td>
                        <td>${Preco}</td>
                        <td>${Descricao}</td>
                        <td>
                    <button type="button" class="btn btn-primary"><i class="far fa-eye"></i>Editar</button>
              <button type="button" class="btn btn-success"><i class="fas fa-edit"></i>Adicionar</button>
            <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i>Remover</button>
            </td>
                   </tr>
                       </tr>
                       `
            tabela.innerHTML += row
        }
    }
    