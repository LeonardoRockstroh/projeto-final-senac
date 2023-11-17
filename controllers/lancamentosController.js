module.exports = {
  getLancamentos: (req, res) => {
    res.render('lancamentos', { username: req.session.username });
  },

  getLancarEntrada: (req, res) => {
    res.render('lancar-entrada', { username: req.session.username });
  },

  getLancarSaida: (req, res) => {
    res.render('lancarSaida', { username: req.session.username });
  },

  getRelatorioLancamentos: (req, res) => {
    res.render('relatorioLancamentos', { username: req.session.username });
  },
};
