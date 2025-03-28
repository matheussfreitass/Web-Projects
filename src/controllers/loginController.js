const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    // Se o usuário estiver logado, redireciona para a página 'login-logado'
    if(req.session.user) {
        return res.render('login-logado');
    }
    return res.render('login');  // Caso contrário, renderiza a página de login

    // Logs para verificar se a sessão está sendo salva corretamente
    console.log(req.session.user);
    res.render('login');
};

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();  // Tenta registrar o usuário

        // Se houver erros, salva na sessão e redireciona de volta para a página de login
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);  // Armazena os erros na sessão
            req.session.save(() => res.redirect('/login/index')); // Redireciona com mensagens de erro
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(() => res.redirect('/login/index')); // Redireciona com mensagem de sucesso

    } catch (e) {
        console.log(e);
        return res.render('404');  // Caso ocorra algum erro, renderiza a página 404
    }
};

exports.login = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login();  // Tenta autenticar o usuário

        // Se houver erros, armazena e redireciona para a página de login com mensagens de erro
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);  // Armazena os erros na sessão
            req.session.save(() => res.redirect('/login/index')); // Redireciona com mensagens de erro
            return;
        }

        // Se o login for bem-sucedido, salva o usuário na sessão e redireciona
        req.flash('success', 'Você ingressou na agenda');
        req.session.user = login.user;  // Salva o usuário na sessão
        req.session.save(() => res.redirect('/'));  // Redireciona para a página principal

    } catch (e) {
        console.log(e);
        return res.render('404');  // Caso ocorra algum erro, renderiza a página 404
    }
};

exports.logout = function(req, res) {
    req.session.destroy();  // Destroi a sessão do usuário
    res.redirect('/');  // Redireciona para a página inicial
};
