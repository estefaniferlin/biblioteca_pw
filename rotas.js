const { Router } = require('express');

const controleAutores = require('./controladores/autores');
const controleGeneros = require('./controladores/generos');
const controleLivros = require('./controladores/livros');

const rotas = new Router();

rotas.route('/autores') // vou associar uma rota a um metodo
    .get(controleAutores.getAutores)
    .post(controleAutores.addAutor)
    .put(controleAutores.updateAutor)
    
rotas.route('/autores/:codigo') // predios com algum valor (o codigo), essa sera minha rota
    .delete(controleAutores.deleteAutor)
    .get(controleAutores.getAutorPorCodigo)

rotas.route('/generos')
    .get(controleGeneros.getGeneros)
    .post(controleGeneros.addGenero)
    .put(controleGeneros.updateGenero)

rotas.route('/generos/:codigo')
    .delete(controleGeneros.deleteGenero)
    .get(controleGeneros.getGeneroPorCodigo)

rotas.route('/livros')
    .get(controleLivros.getLivros)
    .post(controleLivros.addLivro)
    .put(controleLivros.updateLivro)

rotas.route('/livros/:codigo')
    .delete(controleLivros.deleteLivro)
    .get(controleLivros.getLivroPorCodigo)

module.exports = rotas;
