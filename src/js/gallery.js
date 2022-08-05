import { UnSplashApi } from "./unSplash-API"
import { addGalleryMarkup } from "./galleryMarkup"
const list = document.querySelector(".js-gallery")



const unSplashApi = new UnSplashApi();
unSplashApi.getPopularImages().then(({total, total_pages, results}) => {
    const markup = addGalleryMarkup(results)
    console.log(markup);
    list.insertAdjacentHTML("beforeend", markup)

})



