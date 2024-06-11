document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelector(".forms"),
        pwShowHide = document.querySelectorAll(".eye-icon"),
        links = document.querySelectorAll(".link"),
        forgotPassLink = document.getElementById('forgot-pass'),
        recoverPasswordForm = document.querySelector('.form.recover'),
        emailField = document.getElementById('email'),
        senhaField = document.getElementById('senha'),
        emailError = document.getElementById('email-error'),
        senhaError = document.getElementById('senha-error'),
        recoverEmailError = document.getElementById('recover-email-error'),
        recoverPasswordError = document.getElementById('recover-password-error');

    pwShowHide.forEach(eyeIcon => {
        eyeIcon.addEventListener("click", () => {
            let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

            pwFields.forEach(password => {
                if (password.type === "password") {
                    password.type = "text";
                    eyeIcon.classList.replace("bx-hide", "bx-show");
                    return;
                }
                password.type = "password";
                eyeIcon.classList.replace("bx-show", "bx-hide");
            })
        })
    });

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault(); // impede de enviar o formulario
            const targetClass = link.classList.contains('signup-link') ? 'show-signup' :
                link.classList.contains('login-link') ? '' : 'show-recover';
            forms.className = `container forms ${targetClass}`;
        })
    });

    forgotPassLink.addEventListener('click', e => {
        e.preventDefault();
        forms.className = 'container forms show-recover';
    });

    document.getElementById('recover-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email-recover').value;
        const newPassword = document.getElementById('password-recover').value; // Obtém a nova senha

        recoverEmailError.textContent = '';
        recoverPasswordError.textContent = ''; // Limpa qualquer mensagem de erro anterior

        if (!email) {
            recoverEmailError.textContent = 'Por favor, preencha o campo de email.';
        } else if (!email.includes('@')) {
            recoverEmailError.textContent = 'O email deve conter um "@".';
        } else if (!newPassword) { // Verifica se a nova senha foi fornecida
            recoverPasswordError.textContent = 'Por favor, preencha o campo de nova senha.';
        } else {
            if (newPassword.length < 6) {
                showErrorMessage(recoverPasswordError, 'A senha deve ter no mínimo 6 caracteres.');
            } else {
                fetch('/actions/recuperar_senha.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `email=${email}&password=${newPassword}`, // Passa o email e a nova senha para o script PHP
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showErrorMessage(recoverPasswordError, data.message);
                            window.location.href = '/';
                        } else {
                            showErrorMessage(recoverPasswordError, data.message);
                        }
                    })
                    .catch(error => console.error(error));
            }
        }
    });

    document.getElementById('login-btn').addEventListener('click', (event) => {
        event.preventDefault();
        const email = emailField.value;
        const senha = senhaField.value;

        emailError.textContent = '';
        senhaError.textContent = '';

        let valid = true;

        if (!email) {
            showErrorMessage(emailError, 'Por favor, preencha o campo de email.');
            valid = false;
        } else if (!email.includes('@')) {
            showErrorMessage(emailError, 'O email deve conter um "@".');
            valid = false;
        }

        if (!senha) {
            showErrorMessage(senhaError, 'Por favor, preencha o campo de senha.');
            valid = false;
        } else if (senha.length < 6) {
            showErrorMessage(senhaError, 'A senha deve ter no mínimo 6 caracteres.');
            valid = false;
        }

        if (valid) {
            fetch('/actions/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Redirecionar ou executar ação de sucesso
                        window.location.href = 'home.html';
                    } else {
                        // Exibir mensagem de erro
                        showErrorMessage(emailError, 'Email ou senha incorretos. Por favor, tente novamente.');
                    }
                })
                .catch(error => console.error(error));
        }
    });

    document.getElementById('signup-btn').addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('signup-email').value;
        const senha = document.getElementById('signup-senha').value;
        const confirmarSenha = document.getElementById('signup-confirmar-senha').value;

        // Verifica se as senhas coincidem
        if (senha !== confirmarSenha) {
            showErrorMessage(emailError, 'As senhas não coincidem.');
            return;
        }

        if (senha.length < 6) {
            showErrorMessage(emailError, 'A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', senha);

        fetch('/actions/create_user.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Exibir mensagem de sucesso
                    showErrorMessage(emailError, data.message);
                    // Redirecionar para a página de login
                    window.location.href = '';
                } else {
                    // Exibir mensagem de erro
                    showErrorMessage(emailError, data.message);
                }
            })
            .catch(error => console.error(error));
    });

    function showErrorMessage(element, message) {
        element.innerHTML = `<span style="color: red">${message}</span>`;
    }
});
