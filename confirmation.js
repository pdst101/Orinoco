//Accessing data from local storage
let data = JSON.parse(localStorage.getItem('order'));

//Redirect to home page
function redirect() {
    if (data === null) {
        window.location.href = 'index.html';
    };
};
redirect();

//Displaying unique order number
function displayOrderNumber() {
    let price = JSON.parse(localStorage.getItem('totalPrice'));
    const order = document.getElementById('order');

    //Create elements
    const thankYou = document.createElement('h3');
    thankYou.innerHTML = 'Thank you for shopping with us!';
    order.appendChild(thankYou);

    const orderId = document.createElement('p');
    orderId.innerHTML = 'Order ID: ' + data.orderId;
    order.appendChild(orderId);

    const totalPrice = document.createElement('p');
    totalPrice.innerHTML = price;
    order.appendChild(totalPrice);

    localStorage.clear();
};
displayOrderNumber();