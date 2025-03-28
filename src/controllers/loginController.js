const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado')
        return res.render('login')

    
    console.log(req.session.user)
    res.render('login');
};

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login/index')); // Redireciona para a página de login com mensagens de erro
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(() => res.redirect('/login/index')); // Redireciona com mensagem de sucesso

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};


exports.login = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login/index')); // Redireciona para a página de login com mensagens de erro
            return;
        }

        req.flash('success', 'Você ingressou na agenda');
        req.session.user= login.user;
        req.session.save(() => res.redirect('/login/index')); // Redireciona com mensagem de sucesso

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};
exports.logout = function(req,res){
    req.session.destroy();
    res.redirect('/')
}