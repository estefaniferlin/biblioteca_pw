const { response } = require('express');
const { pool } = require('../config');

const getAutores = (request, response) => {
   pool.query('SELECT * FROM autor ORDER BY codigo', 
    (error, results) => {
            if(error){
                return response.status(400).json({
                    status : 'error',
                    message : 'Erro ao consultar o prédio: ' + error
                })
            }
            response.status(200).json(results.rows);
    }
   )
}

const addAutor = (request, response) => {
    const{nome} = request.body;
    pool.query(`INSERT INTO autor (nome)
    VALUES ($1) RETURNING codigo, nome`,
    [nome],
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao inserir o autor!'
            })
        }
        response.status(200).json({
            status : "success", message : "Autor criado!",
            objeto : results.rows[0] // retorna o autor criado
        })
    })
}

const updateAutor = (request, response) => {
    const {codigo, nome} = request.body; 
    pool.query(`UPDATE autor SET nome=$1
    WHERE codigo =$2 RETURNING codigo, nome`, 
    [nome, codigo], 
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao alterar o autor!'
            })
        }
        response.status(200).json({
            status : "success", message : "Autor alterado!",
            objeto : results.rows[0] 

        })
    })
}

const deleteAutor = (request, response) => {
    const codigo = parseInt(request.params.codigo); // nos parametros da requisicao vou passar um codigo
    pool.query(`DELETE FROM autor WHERE codigo = $1`, [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){  // se o item ja foi deletado, ele retorna dizendo que nenhuma linha foi removida, justamente por nao existir mais
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao remover o autor: ' + 
                    (error ? error : 'Nenhuma linha removida')
            })
        }
        response.status(200).json({
            status : "success", message : "Autor removido!",
            objeto : results.rows[0] // retorna o predio criado, o primeiro deles no caso

        })
    })
}

const getAutorPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo); // nos parametros da requisicao vou passar um codigo
    pool.query(`SELECT * FROM autor WHERE codigo = $1`, [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){  // se o item ja foi deletado, ele retorna dizendo que nenhuma linha foi removida, justamente por nao existir mais
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao recuperar o autor: ' + 
                    (error ? error : 'Nenhuma linha encontrada')
            })
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = { getAutores, addAutor, updateAutor, deleteAutor, getAutorPorCodigo } 