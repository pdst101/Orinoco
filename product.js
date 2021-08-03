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

            //Add div for success message
            const displayMessage = document.createElement('p');
            displayMessage.classList.add('text-success');
            displayMessage.setAttribute('id', 'successMessage');
            details.appendChild(displayMessage);
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
    const successMessage = document.getElementById('successMessage');
    let cartProducts = [];
    let item = {
        id: id,
        lense: lense,
        quantity: quantity,
        title: title,
        picture: picture,
        price: price,
    };
    let cart = localStorage.getItem('item');
    if (cart === null) {
        cartProducts.push(item);
        localStorage.setItem('item', JSON.stringify(cartProducts));
        successMessage.innerHTML = 'Item successfully added to cart!';
    } else {
        cartProducts = JSON.parse(cart);
        cartProducts.push(item);
        localStorage.setItem('item', JSON.stringify(cartProducts));
        successMessage.innerHTML = 'Item successfully added to cart!';
    };
    updateCartQuantity();
};
