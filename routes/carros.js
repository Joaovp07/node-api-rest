let express = require('express');
const router = express.Router();
const CarroDB = require('../model/CarroDB');

// ─────────────────────────────────────────────────────────────
// GET /api/carros
// Lista todos os carros.
//
// CarroDB.getCarros() retorna uma Promise.
// .then()  → recebe o array de carros e envia como JSON
// .catch() → passa o erro para o middleware de erro do app.js (next)
// ─────────────────────────────────────────────────────────────
router.get('/', function (req, res, next) {
    CarroDB.getCarros()
        .then(function (carros) {
            res.json(carros);
        })
        .catch(function (error) {
            console.log("Erro de SQL: " + error.message);
            next(error); // encaminha para o middleware de erro 500 no app.js
        });
});


router.get('/:valor', function (req, res, next) {
    let valor = req.params.valor;

    if (!isNaN(valor)) {
        // É um número → busca por ID
        CarroDB.getCarroById(valor)
            .then(function (carro) {
                if (!carro) {
                    return res.status(404).json({ msg: 'Carro não encontrado!' });
                }
                res.json(carro);
            })
            .catch(function (error) {
                console.log("Erro de SQL: " + error.message);
                next(error);
            });
    } else {
        // É texto → busca por tipo
        CarroDB.getCarrosBytipo(valor)
            .then(function (carros) {
                res.json(carros);
            })
            .catch(function (error) {
                console.log("Erro de SQL: " + error.message);
                next(error);
            });
    }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/carros/:id
// Deleta um carro pelo ID.
// ─────────────────────────────────────────────────────────────
router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    console.log("Deletar carro id: " + id);
    CarroDB.deleteById(id)
        .then(function (affectedRows) {
            if (affectedRows === 0) {
                return res.status(404).json({ msg: 'Carro não encontrado!' });
            }
            res.json({ msg: 'Carro deletado com sucesso.' });
        })
        .catch(function (error) {
            console.log("Erro de SQL: " + error.message);
            next(error);
        });
});

// ─────────────────────────────────────────────────────────────
// POST /api/carros
// Cria um novo carro.
// A Promise resolve com o carro já com o id inserido.
// ─────────────────────────────────────────────────────────────
router.post('/', function (req, res, next) {
    let carro = req.body;
    CarroDB.save(carro)
        .then(function (carroCriado) {
            res.status(201).json(carroCriado);
        })
        .catch(function (error) {
            console.log("Erro de SQL: " + error.message);
            next(error);
        });
});

// ─────────────────────────────────────────────────────────────
// PUT /api/carros
// Atualiza um carro existente (id deve vir no body).
// ─────────────────────────────────────────────────────────────
router.put('/', function (req, res, next) {
    let carro = req.body;
    CarroDB.update(carro)
        .then(function (carroAtualizado) {
            res.json(carroAtualizado);
            console.log("Carro atualizado: " + JSON.stringify(carroAtualizado));
        })
        .catch(function (error) {
            console.log("Erro de SQL: " + error.message);
            next(error);
        });
});

module.exports = router;
