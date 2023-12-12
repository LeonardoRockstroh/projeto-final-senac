const produtosRepository = require('../repository/produtosRepository');
const lancamentoRepository = require('../repository/lancamentoRepository');

module.exports = {
    getDeletarProduto: async (req, res) => {
        const productId = req.params.id;

        try {
            await lancamentoRepository.deletarLancamentoProd(productId)
            await produtosRepository.deletarProduto(productId);
            // Redirecionar para a lista com uma mensagem no query parameter
            res.redirect('/lista-de-produtos');
        } catch (error) {
            // Redirecionar para a lista com uma mensagem de erro no query parameter
            res.redirect('/lista-de-produtos');
        }
    },
};
