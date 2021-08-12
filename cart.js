//Populating items from local storage in cart
function displayCart() {
    let removeItem = document.getElementsByClassName('btn-danger');
    let item = JSON.parse(localStorage.getItem('item'));
    for (let i = 0; i < item.length; i++) {
        let data = item[i];
        //Catch element
        const cart = document.getElementById('chosenItems');

        //Create div for items list
        const itemList = document.createElement('div');
        itemList.classList.add('row', 'py-1');
        cart.appendChild(itemList);

        //Populate item picture
        const itemPicture = document.createElement('img');
        itemPicture.setAttribute('src', data.picture);
        itemPicture.classList.add('col-md-2', 'col-3', 'm-auto');
        itemList.appendChild(itemPicture);

        //Populate item title
        const itemTitle = document.createElement('div');
        itemTitle.classList.add('col-2', 'm-auto');
        itemTitle.innerHTML = data.title;
        itemList.appendChild(itemTitle);

        //Populate item lense type
        const itemLense = document.createElement('div');
        itemLense.classList.add('col-2', 'm-auto');
        itemLense.innerHTML = data.lense;
        itemList.appendChild(itemLense);

        //Populate item quantity
        const itemQuantity = document.createElement('div');
        itemQuantity.classList.add('col-md-2', 'col-1', 'm-auto');
        itemQuantity.innerHTML = data.quantity;
        itemList.appendChild(itemQuantity);

        //Populate item price
        const itemPrice = document.createElement('div');
        itemPrice.classList.add('col-2', 'm-auto');
        itemPrice.innerHTML = data.price;
        itemList.appendChild(itemPrice);

        //Delete item button
        const itemDelete = document.createElement('div');
        itemDelete.classList.add('col-2', 'm-auto');
        itemList.appendChild(itemDelete);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-danger', 'btn-close');
        itemDelete.appendChild(deleteButton);

        //Onlick removing item from local storage and element
        let removeButton = removeItem[i];
        removeButton.addEventListener('click', function (event) {
            updateCartQuantity();
            let clickedButton = event.target;
            clickedButton.parentElement.parentElement.remove();
            item.splice([i], 1);
            localStorage.setItem('item', JSON.stringify(item));
            location.reload();
        });
    };
};
displayCart();

//Accessing each form field
const detailsForm = document.getElementById('detailsForm');
let firstName = document.getElementById('firstName');
let surname = document.getElementById('surname');
let email = document.getElementById('email');
let address = document.getElementById('address');
let city = document.getElementById('city');
let postcode = document.getElementById('postcode');


//Validating form inputs
function checkForm() {
    firstNameValue = firstName.value.trim();
    surnameValue = surname.value.trim();
    emailValue = email.value.trim();
    addressValue = address.value.trim();
    cityValue = city.value.trim();
    postcodeValue = postcode.value.trim();
    if (firstNameValue === '' || surnameValue === '' || emailValue === '' || addressValue === '' || cityValue === '' || postcodeValue === '') {
        alert('Some details are missing!');
        return false
    } else {
        return true
    };
};

//POST request to update contact and product list
detailsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let totalPrice = document.getElementById('totalPrice').innerHTML;
    let productArray = JSON.parse(localStorage.getItem('item'));
    let productId = productArray.map(item => item.id);
    let object = {
        contact: {
            firstName: firstName.value.trim(),
            lastName: surname.value.trim(),
            email: email.value.trim(),
            city: city.value.trim(),
            address: address.value.trim(),
        },
        products: productId,
    };
    console.log(totalPrice);
    if (checkForm()) { //Check if form is valid
        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object), //POST request with object(contact+item list)
        }).then(res => res.json()).then(data => { //Response with data including Order ID
            console.log(data);
            if (data === null) {
                alert('No items in cart');
            } else {
                localStorage.setItem('order', JSON.stringify(data));
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
                localStorage.removeItem('item');
            };
            window.location.href = 'confirmation.html';
        });
    };
});

//Calculating total Price
function displayTotalPrice() {
    let totalPrice = document.getElementById('totalPrice');
    let data = JSON.parse(localStorage.getItem('item'));
    let itemPrice;
    let totalItemsPrice = 0;
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        itemPrice = Number(item.price.replace('$', '')) * Number(item.quantity);
        totalItemsPrice = totalItemsPrice + itemPrice;
        totalPrice.innerHTML = 'Total price: ' + totalItemsPrice + '$';
    };
};
displayTotalPrice();