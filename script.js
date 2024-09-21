let products = [
    {
        name: 'Black T-Shirt',
        description: 'Some quick example text for Black T-Shirt.',
        price: 40,
        img: 'img/Rectangle 37.png'
    },
    {
        name: 'Black Watch',
        description: 'Some quick example text for Black Watch.',
        price: 50,
        img: 'img/Rectangle 37 (1).png'
    },
    {
        name: 'Blue Back Bag',
        description: 'Some quick example text for Blue Back Bag.',
        price: 60,
        img: 'img/Rectangle 37 (2).png'
    },
    {
        name: 'Gaming Keyboard',
        description: 'Some quick example text for Gaming Keyboard.',
        price: 70,
        img: 'img/Rectangle 37 (3).png'
    },
    {
        name: 'Modern Headset',
        description: 'Some quick example text for Modern Headset.',
        price: 80,
        img: 'img/Rectangle 37 (4).png'
    },
    {
        name: 'Special Black T-Shirt',
        description: 'Some quick example text for Special Black T-Shirt.',
        price: 90,
        img: 'img/Rectangle 37 (5).png'
    },
    {
        name: 'Ultimate Black T-Shirt',
        description: 'Some quick example text for Ultimate Black T-Shirt.',
        price: 100,
        img: 'img/Rectangle 37 (6).png'
    },
    {
        name: 'Exclusive Black T-Shirt',
        description: 'Some quick example text for Exclusive Black T-Shirt.',
        price: 120,
        img: 'img/Rectangle 37 (7).png'
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderProductList() {
    let productlist = document.getElementById("product-list");
    if (productlist) {
        productlist.innerHTML = ""; 
        products.forEach((product, index) => {
            let inCart = cart.find(item => item.name === product.name);
            let buttonText = inCart ? "Remove from Cart" : "Add to Cart";
            let buttonClass = inCart ? "btn btn-danger" : "btn btn-primary";

            let productCard = `
                <div class="col">
                    <div class="card">
                        <a href="product.html?id=${index}">
                            <img src="${product.img}" class="card-img-top" alt="${product.name}">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <h6 class="card-price" style="color: #7749F8;">$${product.price}</h6>
                            <p class="card-text">${product.description}</p>
                            <button class="${buttonClass} w-100" onclick="toggleCart(${index})">${buttonText}</button>
                        </div>
                    </div>
                </div>
            `;
            productlist.innerHTML += productCard;
        });
    }
}

function loadProductDetails() {
    let params = new URLSearchParams(window.location.search);
    let productId = params.get("id");
    
    if (productId !== null) {
        let product = products[productId];
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price}`;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productImage').src = product.img;

        let inCart = cart.find(item => item.name === product.name);
        let buttonText = inCart ? "Remove from Cart" : "Add to Cart";
        let buttonClass = inCart ? "btn btn-danger" : "btn btn-secondary";

        document.querySelector('.btn-secondary').textContent = buttonText;
        document.querySelector('.btn-secondary').className = buttonClass;
    }
}

function toggleCart(index) {
    let product = products[index];
    let inCart = cart.find(item => item.name === product.name);

    if (inCart) {
        cart = cart.filter(item => item.name !== product.name); // Remove from cart
    } else {
        cart.push({ ...product, quantity: 1 }); // Add to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    renderProductList();
    renderCart();
}

function renderCart() {
    let shopping_cart = document.getElementById("shopping-cart");
    
    shopping_cart.innerHTML = ""; // Clear previous cart contents
    
    if (cart.length === 0) {
        shopping_cart.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        let productCard = `
        
<div class="product-item" id="cart-item-${index}">
    <img src="${item.img}" class="card-img-top" alt="${item.name}">
    <div class="product-details">
        <span class="product-name">${item.name}</span>
        <div class="product-quantity">
            <button class="decrease" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="count">${item.quantity}</span>
            <button class="increase" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
    </div>
    <button class="remove" onclick="removeFromCart(${index})">Remove</button>
</div>

           
        `;
        shopping_cart.innerHTML += productCard;
    });

    shopping_cart.innerHTML += `
        <div class="order-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: <span id="subtotal">${total}</span></p>
            <p>Estimated Tax: <span id="estimated-tax">$0.00</span></p>
            <p>Estimated Shipping: <span id="estimated-shipping">$0.00</span></p>
            <p>Total: <span id="total">${total}</span></p>
            <button class="checkout-button">Checkout</button>
        </div>
    `;
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    renderCart(); // Re-render cart
}

function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        removeFromCart(index); // Remove item if quantity is 0
    } else {
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        renderCart(); // Update cart display
    }
}

// Initial rendering
renderProductList();
loadProductDetails();
renderCart(); // Render the cart on page load