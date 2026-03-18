let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Serve o frontend da pasta public/
app.use(express.static(path.join(__dirname, 'public')));

// Teste de erro intencional
app.get('/teste_erro', function (req, res) {
    throw Error('Erro Ninja');
});

// Rotas da API
app.use('/api/carros', require('./routes/carros'));

// Middleware 404
app.use(function (req, res, next) {
    res.status(404);
   // res.json({ msg: 'Rota não encontrada!' });
   res.sendFile(path.join(__dirname, 'view', 'index.html')); // Redireciona para o frontend
});

// Middleware 500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.json({ msg: 'Ocorreu um erro no servidor! ' + err.message });
});

let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor rodando em http://%s:%s", host, port);
});