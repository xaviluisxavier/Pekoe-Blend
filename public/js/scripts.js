var capturando = 0.0;
let precoProd = 0.0;

function processChas() {
  fetch('http://localhost:3000/chas')
    .then(res => res.json())
    .then(data => {


      const cha = document.getElementById('cha')
      cha.innerHTML += ''
      for (var i = 0; i < data.length; i++) {
        let nome = data[i].nome
        let preco = data[i].preco + " €"
        let imagem = data[i].imagem
        let stock = data[i].stock


        let row = `
          <div class="card">
          <img src="${imagem}" alt="" width="400" height="266">
          <h1>${nome}</h1>
          <p class="price">${preco}</p>
          
          <p><button onclick="adicionarCarrinho('${data[i].nome}','${data[i].preco}','${data[i].imagem}')"type="button" data-toggle="modal" data-target="#cartModal" >Comprar</button></p>
          
          
          <button onclick="showDetail('${data[i].descricao}','${data[i].stock}','${data[i].nome}')" type="button" class="price" data-toggle="modal" data-target="#myModal">Detalhe</button>   
        </div>
        
          
         `
        cha.innerHTML += row
      }
    })
    .catch((err) => {
      alert('Ocorreu um problema...')
      console.log(err)
    })
}






function showDetail(desc, stock, nome) {

  const detalhe = document.getElementById('detalhe')
  detalhe.innerHTML += ''
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


function adicionarCarrinho(nome, preco, imagem) {
  precoProd = preco;
  const carrinho = document.getElementById('carrinho')
  carrinho.innerHTML += ''

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
              <td class="w-25"><img src="${imagem}" class="img-fluid img-thumbnail"  ></td>
              <td>${nome}</td>
              <td id="Preco">${preco}$</td>
              <td> <input id="numeroDigitado" type="number"  min="1" class="form-control" value="1" onchange="TotalizacaoCompra(capturando,precoProd)" ></td>
              <td class="price text-success" id="total">${preco + "€"}</td>
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
        <button type="button" class="btn btn-success" >Comprar</button>
      </div>
    </div>
  </div>

          
        `
  document.body.append(modelWrap)
  var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
  modal.show()
}





function TotalizacaoCompra() {



  capturando = precoProd * parseInt(document.getElementById('numeroDigitado').value)
  document.getElementById('total').innerHTML = capturando.toFixed(2) + "€"

}

