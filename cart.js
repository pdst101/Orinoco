//Populating items from local storage in cart
function displayCart() {
    let removeItem = document.getElementsByClassName('btn-danger')
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
const firstName = document.getElementById('firstName');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const address = document.getElementById('address');
const city = document.getElementById('city');
const postcode = document.getElementById('postcode');

//Validating form inputs
function checkForm() {
    const firstNameValue = firstName.value.trim();
    const surnameValue = surname.value.trim();
    const emailValue = email.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();
    const postcodeValue = postcode.value.trim();
    if (firstNameValue === '' || surnameValue === '' || emailValue === '' || addressValue === '' || cityValue === '' || postcodeValue === '') {
        alert('Some details are missing!')
    } else {
        window.location.href = 'confirmation.html';
    };
};
detailsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkForm();
});

//Calculating total Price
function displayTotalPrice() {
    let totalPrice = document.getElementById('totalPrice');
    let data = JSON.parse(localStorage.getItem('item'));
    let itemPrice;
    let totalItemsPrice = 0;
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        console.log(item);
        itemPrice = Number(item.price.replace('$', '')) * Number(item.quantity);
        totalItemsPrice = totalItemsPrice + itemPrice;
        totalPrice.innerHTML = 'Total price: ' + totalItemsPrice + '$';
    };
};
displayTotalPrice();