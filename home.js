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