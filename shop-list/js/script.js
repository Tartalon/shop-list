'use strict';

const productInput = document.querySelector('.form__input'),
	addButton = document.querySelector('.btn-add'),
	allButton = document.querySelector('.btn-all'),
	productsList = document.querySelector('.products__list');

const data = [
	{ name: 'apple', quantity: 1, bought: true, id: 1, visible: false },
	{ name: 'potato', quantity: 1, bought: false, id: 2, visible: false },
	{ name: 'bread', quantity: 1, bought: true, id: 3, visible: false },
];

let maxId = 3;
let products = [];

if (sessionStorage.getItem('products')) {
	products = JSON.parse(sessionStorage.getItem('products'));
	sortsProducts(products);
} else {
	products = [...data];
}

allButton.addEventListener('click', () => {
	showAllProducts(sortsProducts(products), productsList);
	setStorage(products);
});

addButton.addEventListener('click', e => {
	e.preventDefault();
	if (!productInput.value) return;

	addNewProduct(productInput);
	sortsProducts(products);
	render(products, productsList);

	setStorage(products);
});

productsList.addEventListener('click', e => {
	let target = e.target;

	if (target.classList.contains('product__input')) {
		const prodName = target.parentNode.textContent.trim();
		for (const product of products) {
			if (product.name === prodName) {
				product.bought = target.checked;
			}
		}
	}

	if (target.classList.contains('product__quantity')) {
		const currentLi = target.parentNode;
		const currentProductName = currentLi.firstElementChild.textContent.trim();

		for (const product of products) {
			target.addEventListener('input', () => {
				if (product.name === currentProductName) {
					product.quantity = +target.valueAsNumber;
				}
			});
			setStorage(products);
		}
	}
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
	});

	render(arr, element);
}

function createElement(obj) {
	const li = `
    <li class="product__item list-group-item d-flex justify-content-between">
      <div class="product__input-wrapper">
        <input
          class="form-check-input me-3 product__input"
          type="checkbox"
          aria-label="buy"
          ${obj.bought ? 'checked' : ''}
        />
        ${obj.name}
      </div>
      <input
							type="number"
							class="product__quantity text-center"
							value=${obj.quantity}
							min=1
						/>
    </li>
  `;
	return li;
}

function addNewProduct(input) {
	clearList(productsList);
	const productName = input.value.toLowerCase().trim();
	// let copyProducts = products;
	let sameProduct = false;

	for (let i = 0; i < products.length; i++) {
		if (products[i].name === productName) {
			products[i].quantity++;
			sameProduct = true;
		}
	}

	if (!sameProduct) {
		maxId++;
		products.push(createNewProduct(productName));
	}

	clearInput(productInput);
}

function createNewProduct(name) {
	return {
		name: name,
		quantity: 1,
		bought: false,
		id: maxId,
		visible: true,
	};
}

function render(arr, ul) {
	arr.forEach(item => {
		if (item.visible === true) {
			ul.insertAdjacentHTML('beforeend', createElement(item));
		}
	});
}

function sortsProducts(arr) {
	let sortedProducts = arr.sort(element => {
		if (element.bought < 1) {
			return -1;
		}
	});

	return sortedProducts;
}

function clearList(ul) {
	ul.innerHTML = '';
}

function clearInput(input) {
	input.value = '';
}

function setStorage(arr) {
	sessionStorage.setItem('products', JSON.stringify(arr));
}
