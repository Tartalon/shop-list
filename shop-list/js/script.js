'use strict';

const productInput = document.querySelector('.form__input'),
	addButton = document.querySelector('.btn-add'),
	allButton = document.querySelector('.btn-all'),
	productsList = document.querySelector('.products__list');

const data = [
	{ name: 'apple', quantity: 1, bought: false, id: 1 },
	{ name: 'potato', quantity: 1, bought: false, id: 2 },
	{ name: 'bread', quantity: 1, bought: false, id: 3 },
];

let maxId = 4;

let products = [...data];
let newProducts = [];

allButton.addEventListener('click', () => {
	showAllProducts(products, newProducts, productsList);
});

addButton.addEventListener('click', e => {
	e.preventDefault();
	addNewProduct(productInput, productsList);
});

function showAllProducts(dataArr, newProdArr, element) {
	let allProducts = [];

	if (newProdArr.length) {
		allProducts = [...newProdArr, ...dataArr];
	} else {
		allProducts = [...dataArr];
	}

	if (productsList.childElementCount) {
		const visibleProd = document.querySelectorAll('.product__item');
		if (visibleProd.length === allProducts.length) {
			return;
		}
	}

	allProducts.forEach(item => {
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

// function changeQuantity(quantity, element) {
// 	if (element.value !== quantity) {
// 		element.value = quantity;
// 	}
// }

function addNewProduct(input, element) {
	clearList(productsList);
	maxId++;

	const productName = input.value.toLowerCase().trim();
	const newProduct = {
		name: productName,
		quantity: 1,
		bought: false,
		id: maxId,
	};

	newProducts.unshift(newProduct);
	newProducts.forEach(item => {
		element.insertAdjacentHTML('beforeend', createElement(item));
	});
}

function clearList(element) {
	element.innerHTML = '';
}
