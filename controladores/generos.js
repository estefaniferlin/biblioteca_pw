const { pool } = require('../config');

const getGeneros = (request, response) => {
   pool.query('SELECT * FROM genero ORDER BY codigo', 
        (error, results) => {
            if(error){
                return response.status(400).json({
                    status : 'error',
                    message : 'Erro ao consultar o genero: ' + error
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
                message : 'Erro ao inserir o genero: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Genero criado!",
            objeto : results.rows[0] 
        })
    })
}

const updateGenero = (request, response) => {
    const {nome, codigo} = request.body; 
    pool.query(`UPDATE genero SET nome=$1
    WHERE codigo=$2 RETURNING codigo, nome`, 
    [nome, codigo], 
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao alterar o genero: ' + error
            })
        }
        response.status(200).json({
            status : "success", message : "Genero alterado!",
            objeto : results.rows[0] 

        })
    })
}

const deleteGenero = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM genero WHERE codigo=$1`, [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){  
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao remover o genero: ' + 
                    (error ? error : 'Nenhuma linha removida')
            })
        }
        response.status(200).json({
            status : "success", message : "Genero removido!"
        })
    })
}

const getGeneroPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo); 
    pool.query(`SELECT * FROM genero WHERE codigo=$1`, [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){ 
            return response.status(400).json({
                status : 'error',
                message : 'Erro ao recuperar o genero: ' + 
                    (error ? error : 'Nenhuma linha encontrada')
            })
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = { getGeneros, addGenero, updateGenero, deleteGenero, getGeneroPorCodigo } 