var capturando=0.0;
let precoProd=0.0;

function verchas(){
  fetch('http://localhost:3000/chas')
  .then(res => res.json())
  .then(data => processChas(data))
  .catch((err)=>{
      alert('Ocorreu um problema...')
      console.log(err)
  })
}



function processChas(data){
  console.log(data)
  const cha = document.getElementById('cha')
  cha.innerHTML+= ''
  for(var i=0; i<data.length;i++){
    let Nome = data[i].Nome
    let Preco = data[i].Preco+"$"
    let Imagem = data[i].Imagem
    let Stock = data[i].Stock
    
    
    let row = `
    <div class="card">
    <img src="${Imagem}" alt="" width="400" height="266">
    <h1>${Nome}</h1>
    <p class="price">${Preco}</p>
    
    <p><button onclick="adicionarCarrinho('${data[i].Nome}','${data[i].Preco}','${data[i].Imagem}')"type="button" data-toggle="modal" data-target="#cartModal" >Comprar</button></p>
    
    
    <button onclick="showDetail('${data[i].Descricao}','${data[i].Stock}','${data[i].Nome}')" type="button" class="price" data-toggle="modal" data-target="#myModal">Detalhe</button>   
  </div>
  
    
   `
    cha.innerHTML += row
    }
  }

  
  function showDetail(desc,stock,nome){
    
    const detalhe = document.getElementById('detalhe')
    detalhe.innerHTML+= ''
    modelWrap = document.createElement('div')
    modelWrap.innerHTML = 
        `
      <div class="modal">
                <div class="modal-dialog modal-l">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Detalhe do Chá: ${nome}</h5>
                    </div>
                    <div class="modal-body" ">
                        <p>Stock: ${stock}</p>
                        <p>Descrição: ${desc}</p>
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


    function adicionarCarrinho(Nome,Preco,Imagem){
      precoProd = Preco;
      const carrinho = document.getElementById('carrinho')
      carrinho.innerHTML+= ''

      modelWrap = document.createElement('div')
      modelWrap.innerHTML = 

          `
          <div class="modal fade" id="modelWrap" tabindex="-1" role="dialog" aria-labelledby="carrinho" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header border-bottom-0">
        <h5 class="modal-title" id="carrinho">
          Carrinho
        </h5>
      
      </div>
      <div class="modal-body">
        <table class="table table-image">
          <thead>
            <tr>
              <th scope="col">Imagem</th>
              <th scope="col">Produto</th>
              <th scope="col">Preço</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Total</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="w-25"><img src="${Imagem}" class="img-fluid img-thumbnail"  ></td>
              <td>${Nome}</td>
              <td id="Preco">${Preco}$</td>
              <td> <input id="numeroDigitado" type="number"  min="1" class="form-control" value="1" onchange="TotalizacaoCompra(capturando,precoProd)" ></td>
              <td class="price text-success" id="total">${Preco+"$"}</td>
              <td>
                <a data-bs-dismiss="modal" class="btn btn-danger btn-sm">
                  <i class="fa fa-times"></i>
                </a>
              </td>
            
            </tr>
           
          </tbody>
        </table> 
       
      </div>
      <div class="modal-footer border-top-0 d-flex justify-content-between">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-success" onclick="checkout()">Comprar</button>
      </div>
    </div>
  </div>

          
        `
        document.body.append(modelWrap)
      var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
      modal.show()
      }

   
   

  
function TotalizacaoCompra(){



  capturando = precoProd * parseInt( document.getElementById('numeroDigitado').value)
document.getElementById('total').innerHTML = capturando.toFixed(2)+"$"

}



