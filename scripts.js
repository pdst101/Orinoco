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

            //Catch Element
            const productPage = document.getElementById('product-page');

            //Product Picture
            const newDiv = document.createElement('div');
            newDiv.classList.add('col-12', 'col-md-6');
            productPage.appendChild(newDiv);
            const picture = document.createElement('img');
            picture.classList.add('w-100', 'w-md-50');
            picture.setAttribute('id', 'picture')
            picture.setAttribute('src', dataArray[i].imageUrl);
            newDiv.appendChild(picture);

            //Product Details
            const details = document.createElement('div');
            details.classList.add('col-12', 'col-md-6');
            productPage.appendChild(details);

            //Product Title
            const title = document.createElement('h4');
            title.setAttribute('id', 'title')
            title.innerHTML = dataArray[i].name;
            details.appendChild(title);

            //Product Price
            const price = document.createElement('p');
            price.innerHTML = dataArray[i].price / 100 + '$';
            price.setAttribute('id', 'price')
            price.classList.add('text-success');
            details.appendChild(price);

            //Product Description
            const description = document.createElement('p');
            description.innerHTML = dataArray[i].description;
            details.appendChild(description);

            //Product type dropdown
            const selectType = document.createElement('select');
            selectType.classList.add('custom-select');
            selectType.setAttribute('id', 'lense');
            details.appendChild(selectType);
            const chooseOption = document.createElement('option');
            const lense = dataArray[i].lenses;
            //Loop for lense options
            for (let i = 0; i < lense.length; i++) {
                const lenseType = document.createElement('option');
                lenseType.innerHTML = lense[i];
                selectType.appendChild(lenseType);
            };

            //Quantity input
            const counter = document.createElement('div');
            counter.classList.add('qty', 'mt-2');
            details.appendChild(counter);
            //Minus
            const minus = document.createElement('input');
            minus.classList.add('minus', 'bg-main');
            minus.setAttribute('type', 'button');
            minus.setAttribute('value', '-');
            minus.setAttribute('onclick', 'deduct()');
            counter.appendChild(minus);
            //Input
            const counterInput = document.createElement('input');
            counterInput.classList.add('count');
            counterInput.setAttribute('type', 'number');
            counterInput.setAttribute('value', count);
            counter.appendChild(counterInput);
            //Plus
            const plus = document.createElement('input');
            plus.classList.add('plus', 'bg-main');
            plus.setAttribute('type', 'button');
            plus.setAttribute('value', '+');
            plus.setAttribute('onclick', 'add()');
            counter.appendChild(plus);

            //Add to cart button
            const addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-success', 'my-3', 'px-5');
            addButton.setAttribute('type', 'submit');
            addButton.innerHTML = 'Add to cart';
            addButton.setAttribute('onclick', 'addToCart()');
            details.appendChild(addButton);
        };
    };
};
displayProduct();

// Quantity counter
let count = 1;
let counterInput = document.getElementsByClassName('count')
function add() {
    count++;
    counterInput[0].value = count;
};
function deduct() {
    if (count > 1) {
        count--;
        counterInput[0].value = count;
    };
};
//Add to cart (add to local storage)
function addToCart() {
    const link = window.location.href;
    const id = link.split('id=')[1];
    const quantity = count;
    const lense = document.getElementById('lense').value;
    const title = document.getElementById('title').textContent;
    const picture = document.getElementById('picture').src;
    const price = document.getElementById('price').textContent;
    let item = {
        id: id,
        lense: lense,
        quantity: quantity,
        title: title,
        picture: picture,
        price: price,
    };
    let cart = localStorage;
    if (cart === null) {
        localStorage.setItem('item0', JSON.stringify(item));
    } else {
        localStorage.setItem('item' + cart.length, JSON.stringify(item));
    };
    // console.log(localStorage);
};

//Populating items from local storage in cart
function displayCart() {
    let removeItem = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < localStorage.length; i++) {
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        // console.log(data);

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
        removeButton.addEventListener('click', function(event) {
            let clickedButton = event.target;
            clickedButton.parentElement.parentElement.remove();
            localStorage.removeItem(localStorage.key(i));
            window.location.reload();
        });
    };
};
displayCart();
