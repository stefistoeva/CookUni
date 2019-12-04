import { getTemplate, setHeaderInfo, displayError } from "../helpers/storage.js";
import { post, get, del, put } from "../helpers/requester.js";
const categories = {
    'Vegetables and legumes/beans': 'https://t3.ftcdn.net/jpg/00/25/90/48/240_F_25904887_fhZJ692ukng3vQxzHldvuN981OiYVlJ1.jpg',
    'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
    'Grain Food': 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
    'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
    'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
};

export function getShare(ctx) {
    setHeaderInfo(ctx);
    getTemplate(ctx, './views/recipe/share.hbs');
}

export function postShare(ctx) {
    const { meal, ingredients, prepMethod, description, foodImageURL, category } = ctx.params;

    if(meal && ingredients && prepMethod && description && foodImageURL && category) {
        post('appdata', 'recipes', { 
            meal, 
            ingredients: ingredients.split(' '), 
            prepMethod, 
            description, 
            foodImageURL, 
            category,
            likesCounter: 0,
            categoryImageURL: categories[category]
        }).then(() => {
            ctx.redirect('/');
        }).catch(() => displayError('Something went wrong!'));
    }
}

export function showRecipe(ctx) {
    const id = ctx.params.id;
    setHeaderInfo(ctx);
    get('appdata', `recipes/${id}`, 'Kinvey')
        .then((recipe) => {
            recipe.isCreator = sessionStorage.getItem('userId') === recipe._acl.creator;
            ctx.recipe = recipe;
            getTemplate(ctx, '../views/recipe/recipe-details.hbs');
        })
        .catch(() => displayError('Something went wrong!'));
}

export function getEdit(ctx) {
    const id = ctx.params.id;
    setHeaderInfo(ctx);
    get('appdata', `recipes/${id}`, 'Kinvey')
        .then((recipe) => {
            recipe.ingredients = recipe.ingredients.join(' ');
            ctx.recipe = recipe;

            getTemplate(ctx, '../views/recipe/recipe-edit.hbs');
        })
}

export function postEdit(ctx) {
    const { meal, ingredients, prepMethod, description, foodImageURL, category, likesCounter } = ctx.params;
    const id = ctx.params.id;

    put('appdata', `recipes/${id}`, { 
        meal, 
        ingredients: ingredients.split(' '), 
        prepMethod, 
        description, 
        foodImageURL,
        categoryImageURL: categories[category], 
        category, 
        likesCounter: Number(likesCounter)
    }, 'Kinvey').then(() => {
        ctx.redirect('/');
    }).catch(() => displayError('Something went wrong!'));
}

export function postLike(ctx) {
    const id = ctx.params.id;
    setHeaderInfo(ctx);

    get('appdata', `recipes/${id}`, 'Kinvey')
        .then((recipe) => {
            recipe.likesCounter++;
            return put('appdata', `recipes/${id}`, recipe, 'Kinvey');  
        })
        .then(() => {
            ctx.redirect(`/recipe/${id}`);
        });
}

export function deleteRecipe(ctx) {
    const id = ctx.params.id;
    setHeaderInfo(ctx);

    del('appdata', `recipes/${id}`, 'Kinvey')
        .then(() => {
              ctx.redirect('/');
        })
        .catch(() => displayError('Something went wrong!'));
}