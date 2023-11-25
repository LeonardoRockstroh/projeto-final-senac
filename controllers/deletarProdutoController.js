const produtosRepository = require('../repository/produtosRepository');

module.exports = {
    getDeletarProduto: async (req, res) => {
        const productId = req.params.id;

        try {
            await produtosRepository.deletarProduto(productId);
            // Redirecionar para a lista com uma mensagem no query parameter
            res.redirect('/lista-de-produtos?deletionSuccess=true');
        } catch (error) {
            // Redirecionar para a lista com uma mensagem de erro no query parameter
            res.redirect('/lista-de-produtos?deletionError=true');
        }
    },
};
