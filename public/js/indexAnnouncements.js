/*
<div class="col-12 col-md-6 col-xl-4">
    <div class="card">
        <div class="position-relative">
            <span class="badge bg-danger position-absolute top-0 end-0 px-4 py-2 text-uppercase">sell</span>
            <img src="https://picsum.photos/640/480" class="card-img-top" alt="...">
        </div>
        <div class="card-body p-4">
            <h6 class="card-subtitle textColor fw-bold fs-5"> €120.12</h6>
            <h5 class="card-title display-4">Huawei X5</h5>
            <p class="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="card-footer p-4 bg-white d-flex justify-content-around">
            <p class="mb-0 textColor"><i class="bi bi-heart-fill"></i> <span>Like</span></p>
            <p class="mb-0 textColor"><i class="bi bi-tag-fill"></i> <span>Elettronica</span></p>
            <p class="mb-0 textColor"><i class="bi bi-calendar-fill"></i> <span>27/03/2023</span></p>
        </div>
    </div>
</div>
*/


const announcementsRow= document.getElementById('announcementsRow')


function createAnnouncements(announcementData) {
    const column= document.createElement('div');
    column.classList.add('col-12', 'col-md-6', 'col-xl-4');
    let bgColor;
    if (announcementData.type== 'sell') {
        bgColor= 'bg-danger';
    } else {
        bgColor= 'bg-primary'
    }
    column.innerHTML= `<div class="card">
    <div class="position-relative">
        <span class="badge ${bgColor} position-absolute top-0 end-0 px-4 py-2 text-uppercase">${announcementData.type}</span>
        <img src="https://picsum.photos/640/480" class="card-img-top" alt="...">
    </div>
    <div class="card-body p-4">
        <h6 class="card-subtitle textColor fw-bold fs-5">€ ${announcementData.price}</h6>
        <h5 class="card-title display-4">${announcementData.name}</h5>
        <p class="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-footer p-4 bg-white d-flex justify-content-around">
        <p class="mb-0 textColor"><i class="bi bi-heart-fill"></i> <span>Like</span></p>
        <p class="mb-0 textColor"><i class="bi bi-tag-fill"></i> <span>${announcementData.category}</span></p>
        <p class="mb-0 textColor"><i class="bi bi-calendar-fill"></i> <span>${announcementData.createdAt}</span></p>
    </div>
</div>`


    return column;
}


// per creare la tendina con le opzioni delle categorie
function showCategories (announcements) {
    const categoriesSet= new Set();
        announcements.forEach((announcement)=> {
            categoriesSet.add(announcement.category)
        });

        categoriesSet.forEach((category) => {
            const optionSelect= document.createElement('option');
            optionSelect.textContent= category;
            optionSelect.value= category;
            categorySelect.appendChild(optionSelect);
        })
}




// funzione che mostra gli annunci 
function showAnnouncements(announcements) {
    const announcementsRow= document.getElementById('announcementsRow');
    //clear delle vecchie card
    announcementsRow.innerHTML='';
    // iterare       
    announcements.forEach((announcement) => {
        const announcementColumn=createAnnouncements(announcement);
        announcementsRow.appendChild(announcementColumn);
    });
}








//fuzione che filtra in base alle indicazioni della form 
function announcementsFilteringAndSorting (announcements, options) {
    const announcementFiltered= announcements.filter((announcement) => {

        let isAnnouncementsRequired= true;

        if (options.search.length>0) {
            isAnnouncementsRequired= announcement.name.toLowerCase().includes (options.search.toLowerCase());
        };

        if(isAnnouncementsRequired==true && options.category.length>0) {
           isAnnouncementsRequired= announcement.category== options.category;  
        };

        if(isAnnouncementsRequired==true && options.minPrice.length>0) {
            isAnnouncementsRequired= Number(announcement.price) >= Number(options.minPrice);
        };

        if (isAnnouncementsRequired==true && options.maxPrice.length>0) {
            isAnnouncementsRequired= Number(announcement.price) <= Number(options.maxPrice);
        }
        
        return isAnnouncementsRequired;

    }); 

    switch(options.sort) {
        case 'descByDate':
            break;
        case 'ascByDate':
            break;
        case 'ascByPrice':
            announcementFiltered.sort((left,right) => {
                return Number(left.price) - Number(right.price);
            });
            break;
        case 'descByPrice':
            announcementFiltered.sort((left,right) => {
                return Number(right.price) - Number(left.price);
            });
            break;
        case 'ascByAlpha':
            announcementFiltered.sort((left,right) => {
                return left.name.toLowerCase().localeCompare(right.name.toLowerCase());
            });
            break;
        case 'descByAlpha':
            announcementFiltered.sort((left,right) => {
                return right.name.toLowerCase().localeCompare(left.name.toLowerCase());
            });
            break;
    }

    return announcementFiltered;
};












fetch('/server/annunci.json')
    .then((response)=>{
       return response.json();
    })
    .then((announcements) => {

        const searchInput = document.getElementById('searchInput');
        const categorySelect = document.getElementById('categorySelect');
        const minPriceInput= document.getElementById('minPriceInput');
        const maxPriceInput= document.getElementById('maxPriceInput');
        const sortSelect= document.getElementById('sortSelect');
        
        
        // per creare la tendina con le opzioni delle categorie
        showCategories(announcements);



        //per mostrare gli annunci in base alle indicazioni della form, vado a richiamare la funzione che esegue il filtraggio e successivamente richiamo la funzione che mi mostra gli annunci 
        showAnnouncements(announcements);


        const filterForming= document.getElementById('filterForming');
        filterForming.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const options = {
                search: searchInput.value,
                category: categorySelect.value,
                minPrice: minPriceInput.value,
                maxPrice: maxPriceInput.value,
                sort: sortSelect.value
            }

            const announcementsFiltered= announcementsFilteringAndSorting(announcements, options);
            
            showAnnouncements(announcementsFiltered);

        });

    })
    .catch((error) => {
        console.error();
    })



    