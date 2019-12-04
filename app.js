import { getHome } from "./controllers/homeController.js";
import { getRegister, postRegister, getLogin, postLogin, logoutUser } from "./controllers/userController.js";
import { getShare, postShare, showRecipe, deleteRecipe, postLike, getEdit, postEdit } from "./controllers/recipeController.js";
// import * as userController from './controllers/userController.js';

const app = Sammy('#rooter', function() {
    this.use('Handlebars', 'hbs');
    
    this.get('/', getHome);

    this.get('/register', getRegister);
    this.post('/register', postRegister);
    this.get('/login', getLogin);
    this.post('/login', postLogin);
    this.get('/logout', logoutUser);

    this.get('/share', getShare);
    this.post('/share', postShare);
    this.get('/recipe/:id', showRecipe);
    this.get('/edit/:id', getEdit);
    this.post('/edit/:id', postEdit);
    this.get('/like/:id', postLike);
    this.get('/archive/:id', deleteRecipe);
});

app.run();