'use strict';

const productInput = document.querySelector('.form__input'),
	addButton = document.querySelector('.btn-add'),
	allButton = document.querySelector('.btn-all'),
	productsList = document.querySelector('.products__list');

const data = [
	{ name: 'apple', quantity: 1, bought: false, id: 1, visible: false },
	{ name: 'potato', quantity: 1, bought: false, id: 2, visible: false },
	{ name: 'bread', quantity: 1, bought: false, id: 3, visible: false },
];

let maxId = 4;

let products = [...data];

allButton.addEventListener('click', () => {
	showAllProducts(products, productsList);
});

addButton.addEventListener('click', e => {
	e.preventDefault();
	addNewProduct(productInput, productsList);
});

function showAllProducts(arr, element) {
	clearList(productsList);

	if (productsList.childElementCount) {
		const visibleProd = document.querySelectorAll('.product__item');
		if (visibleProd.length === arr.length) {
			return;
		}
	}

	arr.forEach(item => {
		item.visible = true;
		element.insertAdjacentHTML('beforeend', createElement(item));
	});
}

function createElement(obj) {
	const li = `
    <li class="product__item list-group-item d-flex justify-content-between">
      <div class="product__input-wrapper">
        <input
          class="form-check-input me-3 product__input"
          type="checkbox"
          aria-label="buy"
        />
        ${obj.name}
      </div>
      <input
							type="number"
							class="product__quantity text-center"
							value="1"
						/>
    </li>
  `;
	return li;
}

function addNewProduct(input, element) {
	clearList(productsList);
	maxId++;

	const productName = input.value.toLowerCase().trim();
	const newProduct = {
		name: productName,
		quantity: 1,
		bought: false,
		id: maxId,
		visible: true,
	};

	products.unshift(newProduct);
	products.forEach(item => {
		if (item.visible === true) {
			element.insertAdjacentHTML('beforeend', createElement(item));
		}
	});
	clearInput(productInput);
}

function clearList(ul) {
	ul.innerHTML = '';
}

function clearInput(input) {
	input.value = '';
}
