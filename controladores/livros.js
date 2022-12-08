const { pool } = require('../config');

const getLivros = (request, response) => {
    pool.query('SELECT * FROM livro ORDER BY codigo',
        (error, results) => {
            if(error){
                return response.status(400).json({
                    status : 'error',
                    message : 'Erro ao consultar o livro: ' + error
                })
            }
            response.status(200).json(results.rows);
        }
    )
}

const addLivro = (request, response) => {
    const {titulo, genero, autor} = request.body; 
    pool.query(`INSERT INTO livro (titulo, genero, autor) 
    VALUES ($1, $2, $3) RETURNING titulo, genero, autor`, 
    [titulo, genero, autor], 
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao inserir o livro: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Livro criado",
            objeto : results.rows[0] 
        })
    })
}

const updateLivro = (request, response) => {
    const {titulo, genero, autor, codigo} = request.body; 
    pool.query(`UPDATE livro SET titulo=$1, genero=$2, autor=$3
    WHERE codigo=$4 RETURNING codigo, titulo, genero, autor`, 
    [titulo, genero, autor, codigo], 
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao alterar o livro: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Livro alterado",
            objeto : results.rows[0]
        })
    })
}

const deleteLivro = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM livro WHERE codigo=$1`, [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){  
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao remover o livro: ' + 
                    (error ? error : 'Nenhuma linha removida')
            })
        }
        response.status(200).json({
            status : "success", message : "Livro removido"
        })
    })
}

const getLivroPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo); 
    pool.query(`SELECT * FROM livro WHERE codigo=$1`, [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){ 
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao recuperar o livro: ' + 
                    (error ? error : 'Nenhuma linha encontrada')
            })
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = { getLivros, addLivro, updateLivro, deleteLivro, getLivroPorCodigo } 