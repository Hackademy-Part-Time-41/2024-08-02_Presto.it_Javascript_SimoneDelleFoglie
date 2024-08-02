/*
<div class="col-12 col-md-6 col-lg-4 col-xl-3">
    <div class="category-card rounded-2">
        <div class="bg-white rounded-2 border-card column-class">
            <div class="rounded-circle border-card icon-class d-flex justify-content-center align-items-center">
                <i class="bi bi-car-front-fill"></i>
            </div>
            <h3 class="text-center">Auto</h3>
            <p class="mb-0 text-center">123 Annunci</p>
        </div>
    </div>
</div>
*/


function createCategory(categoryData) {

    const column = document.createElement('div');
    column.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3');
    

    const card = document.createElement('div');
    card.classList.add('category-card', 'rounded-2');
    column.appendChild(card);

    const cardBody= document.createElement('div');
    cardBody.classList.add('bg-white', 'rounded-2', 'border-card', 'column-class');
    card.appendChild(cardBody);

    const iconContainer= document.createElement('div');
    iconContainer.classList.add('rounded-circle', 'border-card', 'icon-class', 'd-flex', 'justify-content-center', 'align-items-center');
    cardBody.appendChild(iconContainer);

    const iconArray= categoryData.icon.split(' ')

    const icon= document.createElement('i');
    icon.classList.add(iconArray[0], iconArray[1]);
    iconContainer.appendChild(icon);

    const title= document.createElement('h3');
    title.textContent= categoryData.name;
    title.classList.add('text-center');
    cardBody.append(title);

    const paragraph= document.createElement('p');
    paragraph.textContent = categoryData.announcmentsCount+ ' '+ 'Annunci';
    paragraph.classList.add('mb-0', 'text-center');
    cardBody.appendChild(paragraph);

    return column;
}




const categoriesRow= document.getElementById("categoriesRow");






fetch('/server/categorie.json')
    .then(function(response) {
        console.log(response.status);
        return response.json();
    })
    .then(function(categories) {
        console.log(categories);

        categories.forEach((category) => {
            const categoryColumn= createCategory(category);
            categoriesRow.appendChild(categoryColumn);
        })
    })
    .catch(function(error) {
        console.error(error);
    })



    