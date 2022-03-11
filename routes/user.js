const connection = require("../public/js/dbconnection");
var bcrypt = require('bcryptjs');

//---------------------------------------------Registo------------------------------------------------------
exports.registo = function (req, res) {


   if (req.method == "POST") {
      let encPass = bcrypt.hashSync(req.body.senha, bcrypt.genSaltSync(2))
      var post = req.body;
      var nome = post.nome_user;
      var email = post.email;

      connection.query('INSERT INTO users (email,nome_user,senha) VALUES (?,?,?)',
         [email, nome, encPass],
         (error, result) => {
            if (error) throw error
            if (result) {
               res.render('login')
            }
            
         })
   } else {
      res.render('registo');
   }
};


//-----------------------------------------------Login------------------------------------------------------
exports.login = function (req, res) {


   if (req.method == "POST") {
      var post = req.body;
      var nome = post.nome_user;
      var senha = post.senha


      connection.query('SELECT * FROM  users  WHERE nome_user = ?',
         [nome],
         (error, result) => {
            let user = result[0]
            if (error) throw error
            if (!user || !bcrypt.compareSync(senha, user.senha)) {
               res.render('login.html');
              
            }

            else {

               req.session.userId = result[0].id;
               req.session.user = result[0];
               console.log(result[0].id);
               res.redirect('/inicio');

            }

         });
   } else {
      res.render('login.html');
   }

};

//-----------------------------------------------DashBoard----------------------------------------------




exports.dashboard = function (req, res, next) {

   var user = req.session.user,
      userId = req.session.userId;
   if (userId == null) {
      res.redirect("/dashboard");
      return;
   }


   connection.query('SELECT * FROM users WHERE id = ?', [userId],
      function (err, results) {
         res.render('dashboard.html', { user: user });
      });
};
//------------------------------------Logout----------------------------------------------
exports.logout = function (req, res) {
   req.session.destroy(function (err) {
      res.redirect("/");
   })
};
//--------------------------------Route para a pagina Compra--------------------------------
exports.comprar = function (req, res) {

   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/comprar");
      return;
   }


   connection.query('SELECT * FROM users WHERE id = ?', [userId],
      function (err, result) {
         res.render('comprar.html', { data: result });
      });
};
//---------------------------------Route para a pagina contacto----------------------------------
exports.contacto = function (req, res) {

   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/contacto");
      return;
   }


   connection.query('SELECT * FROM users WHERE id = ?', [userId],
      function (err, result) {
         res.render('contacto.html', { data: result });
      });
};


//---------------------------------Route para a pagina home----------------------------------
exports.home = function (req, res) {

   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/inicio");
      return;
   }
   connection.query('SELECT * FROM users WHERE id = ?', [userId],

      function (err, result) {
         res.render('home.html', { data: result });
      });
};


