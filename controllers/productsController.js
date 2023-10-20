module.exports = {
  getProdutos: (req, res) => {
    res.render('produtos', { username: req.session.username });
  },
};