//Associar as dependências instaladas
const express   = require('express');
//Iniciar app express
const app       = express();
const bodyParser= require('body-parser');
const mongoose  = require('mongoose');

/**
 * Quando tem caracteres especias trocar pelo código fonecido pela propria MongoDB
 * p@ssw0rd'9'! ===> p%40ssw0rd%279%27%21
 */
mongoose.connect('mongodb+srv://raykon503:Kouhyt5468%409698@nodejscluster.xpn4wmv.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('Conectado', function() {
  console.log('Conectado no banco de dados' + 'teste');
});

mongoose.connection.on('error', (err) => {
  console.log('Erro na base de dados '+err);
});


//Este middleware deve estar acima das routes-handlers!
app.use(bodyParser.json());

//'END POINT INVÁLIDO!'
app.get('/', function(req, res) {
    res.send('END POINT INVÁLIDO!');
});

//Todo o URL começado por '/api' chama as rotas em './routes/api'
const routes = require('./routes/api');
app.use('/api', routes);

//Error handling middleware
app.use(function(err, req, res, next){
  console.log(err);
  //'res.status(422)'->muda o status
  res.status(422).send({error: err.message});
});
//FIM DO MIDDLEWARE +++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Servidor na porta 5000
let port = 5000;
//'process.env.port': caso usemos Heroku
app.listen(process.env.port || port, () => {
    console.log('Servidor em execução na porta: '+ port);
});