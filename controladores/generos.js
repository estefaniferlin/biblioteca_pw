const { response } = require('express');
const { pool } = require('../config');

const getGeneros = (request, response) => {
   pool.query('SELECT * FROM genero ORDER BY codigo', 
    (error, results) => {
            if(error){
                return response.status(400).json({
                    status : 'error',
                    message : 'Erro ao consultar o gênero: ' + error
                })
            }
            response.status(200).json(results.rows);
    }
   )
}

const addGenero = (request, response) => {
    const{nome} = request.body;
    pool.query(`INSERT INTO genero (nome)
    VALUES ($1) RETURNING codigo, nome`,
    [nome],
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao inserir o gÊnero!'
            })
        }
        response.status(200).json({
            status : "success", message : "Gênero criado!",
            objeto : results.rows[0] // retorna o genero criado
        })
    })
}

const updateGenero = (request, response) => {
    const {codigo, nome} = request.body; 
    pool.query(`UPDATE genero SET nome=$1
    WHERE codigo =$2 RETURNING codigo, nome`, 
    [nome, codigo], 
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao alterar o gênero!'
            })
        }
        response.status(200).json({
            status : "success", message : "Gênero alterado!",
            objeto : results.rows[0] 

        })
    })
}

const deleteGenero = (request, response) => {
    const codigo = parseInt(request.params.codigo); // nos parametros da requisicao vou passar um codigo
    pool.query(`DELETE FROM genero WHERE codigo = $1`, [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){  // se o item ja foi deletado, ele retorna dizendo que nenhuma linha foi removida, justamente por nao existir mais
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao remover o gênero: ' + 
                    (error ? error : 'Nenhuma linha removida')
            })
        }
        response.status(200).json({
            status : "success", message : "Gênero removido!",
            objeto : results.rows[0] // retorna o predio criado, o primeiro deles no caso

        })
    })
}

const getGeneroPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo); // nos parametros da requisicao vou passar um codigo
    pool.query(`SELECT * FROM genero WHERE codigo = $1`, [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){  // se o item ja foi deletado, ele retorna dizendo que nenhuma linha foi removida, justamente por nao existir mais
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao recuperar o gênero: ' + 
                    (error ? error : 'Nenhuma linha encontrada')
            })
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = { getGeneros, addGenero, updateGenero, deleteGenero, getGeneroPorCodigo } 