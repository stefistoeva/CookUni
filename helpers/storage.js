
function getPartials() {
    return {
        header: './views/common/header.hbs', 
        footer: './views/common/footer.hbs',
        homeAnon: './views/home-anon.hbs'
    };
}

export function getTemplate(ctx, path) {
    ctx.loadPartials(getPartials())
        .partial(path);
}


//userHelper---------------------
export function saveAuthInfo(userInfo) {
    sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
    sessionStorage.setItem('fullName', `${userInfo.firstName} ${userInfo.lastName}`);
    sessionStorage.setItem('userId', userInfo._id);
}

export function setHeaderInfo(ctx) {
    ctx.isAuth = sessionStorage.getItem('authtoken') !== null;
    ctx.fullName = sessionStorage.getItem('fullName');
}

//notifications------------------
export function displayError(msg) {
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = 'block';
    errorBox.textContent = msg;
    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 2000);
}