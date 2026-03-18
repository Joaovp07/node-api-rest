var mysql = require('mysql2');

class CarroDB {

    // ─────────────────────────────────────────────────────────
    // connect()
    // Cria e retorna uma conexão com o banco de dados.
    // ─────────────────────────────────────────────────────────
    static connect() {
        var conexao = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Audi2007$',
            database: 'db_carros',
        });
        conexao.connect();
        return conexao;
    }

    // ─────────────────────────────────────────────────────────
    // getCarros()
    // Retorna todos os carros incluindo o campo foto.
    // CAPÍTULO 14: adicionamos "foto" no SELECT para que a
    // API também retorne o nome do arquivo de imagem salvo.
    // ─────────────────────────────────────────────────────────
    static getCarros() {
        return new Promise(function (resolve, reject) {
            let conexao = CarroDB.connect();
            let sql = "SELECT id, nome, tipo, url_foto FROM carro";
            conexao.query(sql, function (error, result) {
                conexao.end();
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    // ─────────────────────────────────────────────────────────
    // getCarrosBytipo(tipo)
    // ─────────────────────────────────────────────────────────
    static getCarrosBytipo(tipo) {
        return new Promise(function (resolve, reject) {
            let conexao = CarroDB.connect();
            let sql = "SELECT id, nome, tipo, foto FROM carro WHERE tipo = ?";
            conexao.query(sql, [tipo], function (error, result) {
                conexao.end();
                if (error) reject(error);
                else resolve(result);
            });
        });
    }

    // ─────────────────────────────────────────────────────────
    // getCarroById(id)
    // ─────────────────────────────────────────────────────────
    static getCarroById(id) {
        return new Promise(function (resolve, reject) {
            let conexao = CarroDB.connect();
            let sql = "SELECT * FROM carro WHERE id = ?";
            conexao.query(sql, [id], function (error, result) {
                conexao.end();
                if (error) {
                    reject(error);
                } else if (result.length === 0) {
                    console.log("Registro não encontrado!");
                    resolve(null);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    // ─────────────────────────────────────────────────────────
    // save(carro)
    // Salva um carro. O objeto carro pode conter o campo
    // "foto" com o nome do arquivo enviado pelo Multer.
    // ─────────────────────────────────────────────────────────
    static save(carro) {
        return new Promise(function (resolve, reject) {
            let conexao = CarroDB.connect();
            let sql = "INSERT INTO carro SET ?";
            conexao.query(sql, [carro], function (error, result) {
                conexao.end();
                if (error) {
                    reject(error);
                } else {
                    carro.id = result.insertId;
                    resolve(carro);
                }
            });
        });
    }

    // ─────────────────────────────────────────────────────────
    // update(carro)
    // ─────────────────────────────────────────────────────────
    static update(carro) {
        return new Promise(function (resolve, reject) {
            let conexao = CarroDB.connect();
            let sql = "UPDATE carro SET nome = ?, tipo = ? WHERE id = ?";
            conexao.query(sql, [carro.nome, carro.tipo, carro.id], function (error, result) {
                conexao.end();
                if (error) reject(error);
                else resolve(carro);
            });
        });
    }

    // ─────────────────────────────────────────────────────────
    // Atualiza APENAS o campo foto de um carro já existente.
    // Chamado após o upload da imagem ser concluído com sucesso.
    // ─────────────────────────────────────────────────────────
    static updateFoto(id, foto) {
        return new Promise(function (resolve, reject) {
            let conexao = CarroDB.connect();
            let sql = "UPDATE carro SET foto = ? WHERE id = ?";
            conexao.query(sql, [foto, id], function (error, result) {
                conexao.end();
                if (error) {
                    reject(error);
                } else {
                    resolve(result.affectedRows);
                }
            });
        });
    }

    // ─────────────────────────────────────────────────────────
    // delete(carro)
    // ─────────────────────────────────────────────────────────
    static delete(carro) {
        return new Promise(function (resolve, reject) {
            let conexao = CarroDB.connect();
            let sql = "DELETE FROM carro WHERE id = ?";
            conexao.query(sql, [carro.id], function (error, result) {
                conexao.end();
                if (error) reject(error);
                else resolve(result.affectedRows);
            });
        });
    }

    // ─────────────────────────────────────────────────────────
    // deleteById(id)
    // ─────────────────────────────────────────────────────────
    static deleteById(id) {
        return new Promise(function (resolve, reject) {
            let conexao = CarroDB.connect();
            let sql = "DELETE FROM carro WHERE id = ?";
            conexao.query(sql, [id], function (error, result) {
                conexao.end();
                if (error) reject(error);
                else resolve(result.affectedRows);
            });
        });
    }
}

module.exports = CarroDB;
