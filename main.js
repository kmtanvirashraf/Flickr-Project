// *********************
class PhotoGallery {
    constructor() {
        this.AP1KEY = '563492ad6f91700001000001285ba517723a453a813eaf4ed0cb2e86';
        this.galleryDiv = document.querySelector(".gallery");
        this.searchForm = document.querySelector(".header form");
        this.loadMore = document.querySelector(".load-more");
        this.searchButton = document.querySelector("form ion-icon");
        this.logoClick = document.querySelector(".logo");
        this.pageIndex = 1;
        this.searchString = '';
        this.URLlink=''; 
        this.eventhandle();

    }
    getURL(indx,searchItem,type)
    {
        if(type===1){
            this.URLlink=`https://api.pexels.com/v1/curated?page=${indx}&per_page=12`;
        }else if(type===2)
        {
           this.URLlink=`https://api.pexels.com/v1/search?query=${searchItem}&page=1&per_page=12`;
        }
        else{
            this.URLlink=`https://api.pexels.com/v1/search?query=${searchItem}&page=${indx}&per_page=12`;
        }
         return this.URLlink;
    };
    eventhandle() {  // constructor for all the event required
        document.addEventListener('DOMContentLoaded', () => { // Event for page load
            this.getImg(1);
        });

        this.searchForm.addEventListener('submit', (e) => { // Event for enter when serch string as input 
            this.pageIndex = 1;
            this.getSearchedImages(e);
        });
        this.searchButton.addEventListener('click', (e) => { // Event for clicking search button
            this.pageIndex = 1;
            this.getSearchedImagesOnCLick(e);

        });
        this.loadMore.addEventListener('click', (e) => { // Event for clicking LoadMore button
            this.loadMoreImages(e);
        });
        this.logoClick.addEventListener('click', () => { // Event for clicking Logo
            this.pageIndex = 1;
            this.galleryDiv.innerHTML = '';
            this.getImg(this.pageIndex);
        });

    }
    async getImg(index) { // for loading image with default paramiter especialy when page 
        //loads for the first time or logo click
        this.loadMore.setAttribute('data-img', 'curated');
        const baseURL=this.getURL(index,'',1);
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
    }
    async fetchImages(baseURL) { // Machanism to read data from API
        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: this.AP1KEY
            }
        });
        const data = await response.json();
        return data;
    }
    GenerateHTML(photos) { // Basically this block generate the image div class in the html and sets other properrties
        photos.forEach(photo => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
               <a href='${photo.src.original}' target="_blank"> 
               <img src="${photo.src.medium}"> 
               <h3> 
               By:${photo.photographer}
               <i class="fa fa-print"  style="font-size:18px;color:White"></i>
               &nbsp;
               <i class="fa fa-download" style="font-size:18px;color:White"></i>
               </h3>
               </a>
               `;
            this.galleryDiv.appendChild(item);
        });

    }
    async getSearchedImages(e) { // Method to search image based on serch key
        this.loadMore.setAttribute('data-img', 'search'); // setting the attribute for the load more button other than deafault
        e.preventDefault();
        this.galleryDiv.innerHTML = '';
        const searchvalue = e.target.querySelector("input").value;
        this.searchString = searchvalue; // storing search key globaly
        const baseURL=this.getURL(1,searchvalue,2);
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
        e.target.reset(); // clearing the search input for further use
    };
    async getSearchedImagesOnCLick(e) { // Just a mirror of previous function.I will try to eleminate this
        this.loadMore.setAttribute('data-img', 'search');
        e.preventDefault();
        this.galleryDiv.innerHTML = '';
        const searchvalue = this.searchForm.querySelector("input").value;
        this.searchString = searchvalue;
        const baseURL=this.getURL(1,this.searchString,2);
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
        this.searchForm.reset();
    };
    async getMoreSearchedImages(index) { // Method for loading more image on LoadMore button click
        const searchvalue = this.searchForm.querySelector("input").value;
        const baseURL=this.getURL(index,this.searchString,3);
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
    }
    loadMoreImages(e) {
        let index = ++this.pageIndex; // incrementing page size by 1
        const loadMoreData = e.target.getAttribute('data-img'); // checking if it is first page load event or not 
        if (loadMoreData == 'curated') {
            this.getImg(index);
        } else {
            this.getMoreSearchedImages(index);
        }
    };
    

}
const gallery = new PhotoGallery;


// This block used for Floating card on the page
// **********************

const touchButton = document.querySelector(".float-text");  // get in touch card
const card = document.querySelector(".float-card-info"); // Displayed floating card once get in touch clicked
const close = document.querySelector(".gg-close-r"); // closing the floating card

// const searchInput = document.querySelector('input');

touchButton.addEventListener("click", moveCard);
close.addEventListener("click", moveCard);

function moveCard() { // for displaying and minimizing the floating card
    card.classList.toggle("active");
}






