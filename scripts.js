const url = 'http://localhost:3000/api/cameras';

// API Request
function makeRequest() {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', url);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                    console.log(JSON.parse(apiRequest.response));
                } else {
                    reject(JSON.parse(apiRequest.response));
                }
            }
        };
    });
}

// Populate product card
async function populateProductCards() {
    const productCard = document.getElementById('main');
    const dataArray = await makeRequest();
    for (let i = 0; i < dataArray.length; i++) {
        //Outer card div
        const newDiv = document.createElement('div');
        newDiv.classList.add('col-12', 'col-md-6', 'col-lg-4', 'card');
        productCard.appendChild(newDiv);
        //Link to product page
        const link = document.createElement('a');
        link.setAttribute('href', 'product.html?id=' + dataArray[i]._id);
        newDiv.appendChild(link);
        //Product picture
        const picture = document.createElement('img');
        picture.classList.add('card-img-top');
        picture.setAttribute('src', dataArray[i].imageUrl);
        link.appendChild(picture);
        //Card body
        const card = document.createElement('div');
        card.classList.add('card-body', 'bg-main');
        link.appendChild(card);
        //Card title
        const title = document.createElement('h4');
        title.classList.add('card-title', 'text-center');
        title.innerHTML = dataArray[i].name + " - " + dataArray[i].price / 100 + '$';
        card.appendChild(title);
    };
};
populateProductCards();

//Display on product page
async function displayProduct() {
    const dataArray = await makeRequest();
    const link = window.location.href;
    const currentId = link.split('id=')[1];
    for (let i = 0; i < dataArray.length; i++) {
        if (currentId === dataArray[i]._id) {
            //Check
            console.log(currentId)
            console.log(dataArray[i]._id)
            const productPage = document.getElementById('product-page');
            //Product Picture
            const newDiv = document.createElement('div');
            newDiv.classList.add('col-12', 'col-md-6');
            productPage.appendChild(newDiv);
            const picture = document.createElement('img');
            picture.classList.add('w-100', 'w-md-50');
            picture.setAttribute('src', dataArray[i].imageUrl);
            newDiv.appendChild(picture);
            //Product details
            const details = document.createElement('div');
            details.classList.add('col-12', 'col-md-6');
            productPage.appendChild(details);
            //Product title
            const title = document.createElement('h4');
            title.innerHTML = dataArray[i].name;
            details.appendChild(title);
            //Product price
            const price = document.createElement('p');
            price.innerHTML = dataArray[i].price / 100 + '$';
            price.classList.add('text-success');
            details.appendChild(price);
            //Product description
            const description = document.createElement('p');
            description.innerHTML = dataArray[i].description;
            details.appendChild(description);
            //Product type dropdown
            const lense = dataArray[i].lenses;
            const selectType = document.createElement('select');
            selectType.classList.add('custom-select');
            details.appendChild(selectType);
            const chooseOption = document.createElement('option');
            chooseOption.innerHTML = 'Choose lense...';
            selectType.appendChild(chooseOption);
            //Loop for lense options
            for (let i = 0; i < lense.length; i++) {
                const lenseType = document.createElement('option');
                lenseType.innerHTML = lense[i];
                selectType.appendChild(lenseType);
            };
            //Quantity input
        };
    };

};

displayProduct();


