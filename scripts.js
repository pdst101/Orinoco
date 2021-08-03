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
                } else {
                    reject(JSON.parse(apiRequest.response));
                }
            }
        };
    });
};

//Add total number of units in cart
function updateCartQuantity() {
    let totalQuantity = 0;
    let itemQuantity;
    let data = JSON.parse(localStorage.getItem('item'));
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        itemQuantity = item.quantity;
        totalQuantity = totalQuantity + Number(itemQuantity);
        console.log(totalQuantity);
        document.getElementById('cart').innerHTML = 'Cart (' + totalQuantity + ')';
    };
};
updateCartQuantity();