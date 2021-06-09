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
async function populateProductCard() {
    const productCard = document.querySelector('.main');
    const apiRequest = makeRequest();
    const dataArray = await apiRequest;
    for (let i in dataArray) {
    //Outer card div
    const newDiv = document.createElement('div');
    newDiv.classList.add('col-12', 'col-md-6', 'col-lg-4', 'card');
    productCard.appendChild(newDiv);
    //Link to product page
    const link = document.createElement('a');
    link.setAttribute('href', 'product.html');
    newDiv.appendChild(link);
    //Product Picture
    const picture = document.createElement('img');
    picture.classList.add('card-img-top');
    picture.setAttribute('src', dataArray[i].imageURL);
    link.appendChild(picture);
    }
};
populateProductCard();