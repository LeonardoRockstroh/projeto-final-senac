const produtosRepository = require('../repository/produtosRepository');

module.exports = {
  getEditarProduto: async (req, res) => {
    try {
      const id = req.params.id;
      const produtoTB = await produtosRepository.obterProdutoPorId(id);
      produto = produtoTB[0]

      res.render('editar-produto', { produto });
    } catch (error) {
      res.redirect('/lista-de-produtos');
    }
  },

  postEditarProduto: async (req, res) => {
    console.log(req.body)
    try {
      const { prod_id, prod_name, prod_qtd, prod_vencimento, prod_notif, prod_notif_dias } = req.body;
      await produtosRepository.atualizarProduto(prod_id, prod_name, prod_qtd, prod_vencimento, prod_notif, prod_notif_dias);
      res.redirect('/lista-de-produtos');
    } catch (error) {
      res.redirect('/lista-de-produtos');
    }
  },
};