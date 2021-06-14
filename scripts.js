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
    const productCard = document.getElementById('main');
    const result = makeRequest();
    const dataArray = await result;
    for (let i = 0; i < dataArray.length; i++) {
    //Outer card div
    const newDiv = document.createElement('div');
    newDiv.classList.add('col-12', 'col-md-6', 'col-lg-4', 'card', 'card-block', 'd-flex');
    productCard.appendChild(newDiv);
    //Link to product page
    const link = document.createElement('a');
    link.setAttribute('href', 'product.html');
    newDiv.appendChild(link);
    //Product Picture
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
    title.innerHTML = dataArray[i].name + " - " + dataArray[i].price/100 + '$';
    card.appendChild(title);
    };
};
populateProductCards();