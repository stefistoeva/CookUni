import { getTemplate, saveAuthInfo, setHeaderInfo, displayError } from "../helpers/storage.js";
import { post } from "../helpers/requester.js";

export function getRegister(ctx) {
    setHeaderInfo(ctx);
    getTemplate(ctx, './views/auth/register.hbs');
}

export function postRegister(ctx) {
    const { firstName, lastName, username, password, repeatPassword } = ctx.params;
    
    if(firstName && lastName && username && password && password === repeatPassword) {
        post('user', '', { firstName, lastName, username, password }, 'Basic')
        .then((userInfo) => {
            saveAuthInfo(userInfo);
            ctx.redirect('/');
        })
        .catch(() => displayError('Something went wrong!'));
    }
}

export function getLogin(ctx) {
    setHeaderInfo(ctx);
    getTemplate(ctx, './views/auth/login.hbs');
}

export function postLogin(ctx) {
    const { username, password } = ctx.params;

    if(username && password) {
        post('user', 'login', { username, password }, 'Basic')
            .then((userInfo) => {
                saveAuthInfo(userInfo);
                ctx.redirect('/');
            })
            .catch(() => displayError('Something went wrong!'));
    }
}

export function logoutUser(ctx) {
    post('user', '_logout', {}, 'Kinvey')
        .then(() => {
            sessionStorage.clear();
            ctx.redirect('/');
        })
        .catch(() => displayError('Something went wrong!'));
}