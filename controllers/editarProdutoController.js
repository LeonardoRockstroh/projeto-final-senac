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
    try {
      const id = req.params.id;
      const { prod_qtd, prod_uni, prod_md_armaz, prod_fornecedor, prod_tel_for, prod_end_for, prod_notif, prod_notif_dias } = req.body;
      
      prod_notif_dias_int = prod_notif_dias
      if (prod_notif_dias == null || prod_notif == undefined){
        prod_notif_dias_int = 0
      }

      await produtosRepository.atualizarProduto(id, prod_qtd, prod_uni, prod_md_armaz, prod_fornecedor, prod_tel_for, prod_end_for, prod_notif, prod_notif_dias_int);
      res.redirect('/lista-de-produtos');
    } catch (error) {
      res.redirect('/lista-de-produtos');
    }
  },
}; 