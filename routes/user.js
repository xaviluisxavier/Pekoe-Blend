const connection = require("../public/js/dbconnection");
var bcrypt = require('bcrypt');

//---------------------------------------------Registro------------------------------------------------------
exports.registro = function(req, res){
   
    if(req.method == "POST"){
      
       var post  = req.body;
       var nome= post.nome_user;
       var senha= post.senha;
       var pnome= post.primeiro_nome;
       var unome= post.ultimo_nome;
       var email= post.email;


 
       var sql = "INSERT INTO `users`(`primeiro_nome`,`ultimo_nome`,`email`,`nome_user`, `senha`) VALUES ('" + pnome + "','" + unome + "','" + email + "','" + nome + "','" + senha + "')";
     
       var query = connection.query(sql, function(err, result) {
 
          
          res.render('login.html');
            });
          
    } else {
       res.render('registro');
    }
   
   };
  
 //-----------------------------------------------Login------------------------------------------------------
 exports.login = function(req, res){
    
 
 
    if(req.method == "POST"){
       var post  = req.body;
       var nome= post.nome_user;
       var senha= post.senha;
      
       var sql="SELECT id, primeiro_nome, ultimo_nome, nome_user FROM `users` WHERE `nome_user`='"+nome+"' and senha = '"+senha+"'";                           
       connection.query(sql, function(err, results){      
          if(results.length){
             req.session.userId = results[0].id;
             req.session.user = results[0];
             console.log(results[0].id);
             res.redirect('/home');
          }
          else{
             
             res.render('login.html');
          }
                  
       });
    } else {
       res.render('login.html');
    }
    
 };
 
 //-----------------------------------------------DashBoard----------------------------------------------
            
 exports.dashboard = function(req, res, next){
            
   var user =  req.session.user,
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/home/dashboard");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

   connection.query(sql, function(err, results){
      res.render('dashboard.html', {user:user});    
   });       
};
 //------------------------------------Logout----------------------------------------------
 exports.logout=function(req,res){
    req.session.destroy(function(err) {
       res.redirect("/inicio");
    })
 };
 //--------------------------------Route para a pagina Compra--------------------------------
 exports.comprar = function(req, res){
 
    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/home/comprar");
       return;
    }
 
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
    connection.query(sql, function(err, result){  
       res.render('comprar.html',{data:result});
    });
 };
 //---------------------------------Route para a pagina contacto----------------------------------
 exports.contacto = function(req, res){
 
    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/home/contacto");
       return;
    }
 
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
    connection.query(sql, function(err, result){  
       res.render('contacto.html',{data:result});
    });
 };


 //---------------------------------Route para a pagina home----------------------------------
 exports.home = function(req, res){
 
    var userId = req.session.userId;
    if(userId == null){
       res.redirect("/home");
       return;
    }
 
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";          
    connection.query(sql, function(err, result){  
       res.render('home.html',{data:result});
    });
 };
