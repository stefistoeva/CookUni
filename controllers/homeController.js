import { getTemplate, setHeaderInfo } from "../helpers/storage.js";
import { get } from "../helpers/requester.js";

export function getHome(ctx) {
    setHeaderInfo(ctx);
    if(ctx.isAuth) {
        get('appdata', 'recipes', 'Kinvey')
            .then((recipes) => {
                ctx.recipes = recipes;
                getTemplate(ctx, './views/home.hbs');
            });
    } else {
        getTemplate(ctx, './views/home.hbs');
    }  
};