import { UnSplashApi } from './unSplash-API';
import { addGalleryMarkup } from './galleryMarkup';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
const list = document.querySelector('.js-gallery');
const form = document.querySelector('.search-form')
const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, {
  totalItems: 0,
  itemsPerPage: 30,
  visiblePages: 5,
  page: 1,
});

const unSplashApi = new UnSplashApi();
const page = pagination.getCurrentPage();

unSplashApi.getPopularImages(page).then(({ total, total_pages, results }) => {
  const markup = addGalleryMarkup(results);
  pagination.reset(total);

  list.insertAdjacentHTML('beforeend', markup);
});


// console.log(page);
pagination.on('afterMove', popullar);

function popullar(e) {
    console.log(e.page);

unSplashApi.getPopularImages(e.page).then(({ total, total_pages, results }) => {
  const markup = addGalleryMarkup(results);
  //   pagination.reset(total);

  list.insertAdjacentHTML('beforeend', markup);
});
    
}

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault();
  list.innerHTML = "";
  const { query } = e.currentTarget.elements
  const searchQuery = query.value.trim()
  if (!searchQuery) {
    console.log("введите данные");
    return;
  }
  pagination.off('afterMove', popullar);
  pagination.off('afterMove', eventSearchPagination)
  unSplashApi.query = searchQuery;
  unSplashApi.getImages(page).then(({ total, total_pages, results }) => {
    const markup = addGalleryMarkup(results);
  pagination.reset(total);
  list.insertAdjacentHTML('beforeend', markup);
  })
  pagination.on('afterMove',eventSearchPagination )
  console.log(query.value);
}

function eventSearchPagination(e) {
  unSplashApi.getImages(e.page).then(({ total, total_pages, results }) => {
    const markup = addGalleryMarkup(results);
  list.insertAdjacentHTML('beforeend', markup);
  })
}
console.log(pagination);