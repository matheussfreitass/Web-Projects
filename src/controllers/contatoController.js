const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    res.render('contato');
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors); // Corrigido
            req.session.save(() => res.redirect(req.get('/')));
            return; // Adicionado para interromper a execução
        }

        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(() => res.redirect(req.get('/')));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};
