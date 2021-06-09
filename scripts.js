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
                    console.log(JSON.parse(apiRequest.response))
                } else {
                    reject(JSON.parse(apiRequest.response));
                }
            }
        };
    });  
}

makeRequest();

// Populate product card
async function populateProductCards() {
    const product = document.querySelector('.main');
    const response = makeRequest();
    const apiData = await response;
    for (let i in apiData) {
        const product = document.createElement('div');
        const card = document.createElement('div');
        const link = document.createElement('a');
        const img = document.createElement('IMG');
        const cardTitle = document.createElement('div');

        product.classList.add('col-12', 'col-md-6');
        card.classList.add('card');
        img.classList.add('card-img-top');
        cardTitle.classList.add('card-body', 'bg-main', 'text-center', 'text-light');

        img.setAttribute('src', apiData[i].imageUrl);
        link.setAttribute('href', 'product.html' + '?id=' + apiData[i]._id);


        cardTitle.innerHTML = '<h5>' + apiData[i].name + ' - ' + apiData[i].price / 100 + "$" + '</h5>';

        main.appendChild(product);
        product.appendChild(link);
        link.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardTitle);
    }

}
populateProducts();