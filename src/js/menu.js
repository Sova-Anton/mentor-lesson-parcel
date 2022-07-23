import menu from "./menu.json";
import storage from "./storage";

const menuEl = document.querySelector('.gallery');
const inputEl = document.querySelector('.theme-switch__toggle');
const THEME_KEY = 'theme';

initPage();

inputEl.addEventListener('input', toggleTheme);

function toggleTheme(evt) {
    const { checked } = evt.target;

    document.body.className = checked ? 'dark-theme' : 'light-theme';

    storage.save(THEME_KEY, checked);
}

function initPage() {
    const savedChackd = storage.load(THEME_KEY);

    document.body.className = savedChackd ? 'dark-theme' : 'light-theme';
    inputEl.checked = savedChackd ? true : false;
}

const markup = menu.map(({image, name, price, description, ingredients}) => {
    return `<li class="menu__item">
   <article class="card">
        <div class="card__content">
            <h2 class="card__name">${name}</h2>
            <p class="card__price">
                <i class="material-icons"> monetization_on </i>
                ${price} кредитов
            </p>
            <p class="card__descr">
                ${description}
            </p>
            <ul class="tag-list">
               ${ingredients
                 .map(item => `<li class="tag-list__item">${item}</li>`)
                 .join('')}
            </ul>
        </div>
        <button class="card__button button">
            <i class="material-icons button__icon"> shopping_cart </i>
            В корзину
        </button>
    </article>
</li> `
}).join('');

menuEl.insertAdjacentHTML('beforeend', markup);

/* <img src="${image}" alt="${name}" class="card__image" /> */

