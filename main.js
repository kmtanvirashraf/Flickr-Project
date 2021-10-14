// *********************
class PhotoGallery {
    constructor() {
        this.AP1KEY = '563492ad6f91700001000001285ba517723a453a813eaf4ed0cb2e86';
        this.galleryDiv = document.querySelector(".gallery");
        this.searchForm = document.querySelector(".header form");
        this.loadMore = document.querySelector(".load-more");
        this.searchButton = document.querySelector("form ion-icon");
        this.logoClick=document.querySelector(".logo");
        this.pageIndex=1;
        this.searchString='';
        this.eventhandle();
        
    }

    eventhandle() {
        document.addEventListener('DOMContentLoaded',()=>{
            this.getImg(1);
        });
        
        this.searchForm.addEventListener('submit',(e)=>{
            this.pageIndex=1;
            this.getSearchedImages(e);
        });
        this.searchButton.addEventListener('click', (e) => {
            this.pageIndex=1;
            this.getSearchedImagesOnCLick(e);
            
        });
        this.loadMore.addEventListener('click', (e) => {
            this.loadMoreImages(e);
        });
        this.logoClick.addEventListener('click', () => {
            this.pageIndex=1;
            this.galleryDiv.innerHTML='';
            this.getImg(this.pageIndex);
        });

    }
    async getImg(index) {
        this.loadMore.setAttribute('data-img','curated');
        const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
        const data = await this.fetchImages(baseURL);
     
        this.GenerateHTML(data.photos);
    }
    async fetchImages(baseURL) {
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
    GenerateHTML(photos) {
        photos.forEach(photo => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
               <a href='${photo.src.original}' target="_blank">
               <img src="${photo.src.medium}"> 
               <h3>Taken by:${photo.photographer}</h3>
               </a>
               `;
            this.galleryDiv.appendChild(item);
        });

    }
    async getSearchedImages(e){
        this.loadMore.setAttribute('data-img','search');
        e.preventDefault();
        this.galleryDiv.innerHTML='';
        const searchvalue=e.target.querySelector("input").value;
        this.searchString=searchvalue;
        const baseURL= `https://api.pexels.com/v1/search?query=${searchvalue}&page=1&per_page=12`;
        const data= await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
        e.target.reset();
    };
    async getSearchedImagesOnCLick(e){
        this.loadMore.setAttribute('data-img','search');
        e.preventDefault();
        this.galleryDiv.innerHTML='';
        const searchvalue=this.searchForm.querySelector("input").value;
        this.searchString=searchvalue;
        const baseURL= `https://api.pexels.com/v1/search?query=${searchvalue}&page=1&per_page=12`;
        const data= await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
        this.searchForm.reset();
    };
    async getMoreSearchedImages(index){
        const searchvalue=this.searchForm.querySelector("input").value;
        const baseURL=  `https://api.pexels.com/v1/search?query=${this.searchString}&page=${index}&per_page=12`;
        const data= await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
    }
    loadMoreImages(e){
          let index=++this.pageIndex;
         const loadMoreData= e.target.getAttribute('data-img');
         if(loadMoreData=='curated')
         {
           this.getImg(index);
         } else{
            this.getMoreSearchedImages(index);
         }
    };

    
    
}
const gallery = new PhotoGallery;

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        console.log(document.readyState);
        document.getElementById("PreLoaderBar").style.display = "none";
    }
}

// **********************

const touchButton = document.querySelector(".float-text");
const card = document.querySelector(".float-card-info");
const close = document.querySelector(".gg-close-r");

// const searchInput = document.querySelector('input');

touchButton.addEventListener("click", moveCard);
close.addEventListener("click", moveCard);

function moveCard() {
    card.classList.toggle("active");
}






