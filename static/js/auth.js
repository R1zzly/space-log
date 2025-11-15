// static/js/auth.js (исправленная версия)

document.addEventListener('DOMContentLoaded', function() {
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const translations = {
        en: {
            // Поля ввода
            username: "Username", email: "Email", firsname: "First Name", lastname: "Last Name", phone: "Phone", password: "Password", confirmPassword: "Confirm Password",
            // Кнопки и ссылки
            login: "Login", not_member: "Not a member?", no_account: "Don't have an account?", register_now: "Register now.",
            // **НОВЫЙ БЛОК: Ошибки валидации**
            validation_errors: {
                "Custom user with this Email already exists.": "A user with this email already exists.",
                "Custom user with this Phone already exists.": "A user with this phone already exists.",
                "A user with that username already exists.": "A user with that username already exists.",
                "Passwords do not match.": "Passwords do not match.",
                "This field is required.": "This field is required."
            }
        },
        ru: {
            username: "Имя пользователя", email: "Почта", firsname: "Имя", lastname: "Фамилия", phone: "Телефон", password: "Пароль", confirmPassword: "Подтвердите пароль",
            login: "Войти", not_member: "Еще не зарегистрированы?", no_account: "Нет аккаунта?", register_now: "Зарегистрироваться.",
            validation_errors: {
                "Custom user with this Email already exists.": "Пользователь с такой почтой уже существует.",
                "Custom user with this Phone already exists.": "Пользователь с таким телефоном уже существует.",
                "A user with that username already exists.": "Пользователь с таким именем уже существует.",
                "Passwords do not match.": "Пароли не совпадают.",
                "This field is required.": "Это поле обязательно."
            }
        },
        kz: {
            username: "Пайдаланушы аты", email: "Электрондық пошта", firsname: "Аты", lastname: "Тегі", phone: "Телефон", password: "Құпия сөз", confirmPassword: "Құпия сөзді растау",
            login: "Кіру", not_member: "Тіркелмегенсіз бе?", no_account: "Аккаунтыңыз жоқ па?", register_now: "Тіркелу.",
            validation_errors: {
                "Custom user with this Email already exists.": "Мұндай поштасы бар пайдаланушы бұрыннан бар.",
                "Custom user with this Phone already exists.": "Мұндай телефоны бар пайдаланушы бұрыннан бар.",
                "A user with that username already exists.": "Мұндай аты бар пайдаланушы бұрыннан бар.",
                "Passwords do not match.": "Құпия сөздер сәйкес келмейді.",
                "This field is required.": "Бұл жолды толтыру міндетті."
            }
        },
        cn: {
            username: "用户名", email: "电子邮件", firsname: "名字", lastname: "姓", phone: "电话", password: "密码", confirmPassword: "确认密码",
            login: "登录", not_member: "还不是会员？", no_account: "没有账户？", register_now: "现在注册。",
            validation_errors: {
                "Custom user with this Email already exists.": "使用此电子邮件的用户已存在。",
                "Custom user with this Phone already exists.": "使用此电话的用户已存在。",
                "A user with that username already exists.": "具有该用户名的用户已存在。",
                "Passwords do not match.": "密码不匹配。",
                "This field is required.": "此字段是必需的。"
            }
        }
    };

    let currentLang = 'ru';
    const langButtons = document.querySelectorAll('.lang-btn');

    function translatePage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        document.querySelectorAll('input[placeholder]').forEach(input => {
            const placeholderKey = input.id;
             if (translations[lang][placeholderKey]) {
                input.placeholder = translations[lang][placeholderKey];
            }
        });
    }

    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            currentLang = this.getAttribute('data-lang');
            translatePage(currentLang);
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    translatePage(currentLang);
    document.querySelector('.lang-btn[data-lang="ru"]')?.classList.add('active');


    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const passwordError = document.getElementById('password-error');
            passwordError.textContent = ''; 

            fetch('/api/login/', {
                method: 'POST',
                body: formData,
                headers: { 'X-CSRFToken': getCookie('csrftoken') }
            })
            .then(response => response.json().then(data => ({ ok: response.ok, data })))
            .then(({ ok, data }) => {
                if (ok) {
                    window.location.href = data.redirect_url;
                } else {
                    passwordError.textContent = "Неверное имя пользователя или пароль.";
                }
            }).catch(error => {
                console.error('Login Error:', error);
            });
        });
    }

    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            const formData = new FormData(regForm);

            fetch('/api/register/', {
                method: 'POST',
                body: formData,
                headers: { 'X-CSRFToken': getCookie('csrftoken') }
            })
            .then(response => response.json().then(data => ({ ok: response.ok, data })))
            .then(({ ok, data }) => {
                if (ok) {
                    // alert('Registration successful! Redirecting...');
                    window.location.href = data.redirect_url;
                } else {
                    // **ИЗМЕНЕННЫЙ БЛОК ОБРАБОТКИ ОШИБОК**
                    for (const field in data.errors) {
                        const errorElement = document.getElementById(`${field}-error`);
                        if (errorElement) {
                            const englishError = data.errors[field][0];
                            // Ищем перевод для английской ошибки, если не находим - показываем оригинал
                            const translatedError = translations[currentLang]?.validation_errors?.[englishError] || englishError;
                            errorElement.textContent = translatedError;
                        }
                    }
                }
            }).catch(error => {
                console.error('Registration Error:', error);
            });
        });
    }
});