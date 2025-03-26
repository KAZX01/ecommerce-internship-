document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    // Function to update the cart sidebar
    const updateCartSidebar = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice += item.price;
            const cartItem = document.createElement('div');
            cartItem.classList.add('flex', 'justify-between', 'items-center', 'py-2');
            cartItem.innerHTML = `
                <span>${item.title}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button class="text-red-600 remove-item" data-title="${item.title}"><i class="fas fa-trash"></i></button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

        // Remove item from cart
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const title = event.currentTarget.getAttribute('data-title');
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart = cart.filter(item => item.title !== title);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartSidebar();
            });
        });
    };

    // Show cart sidebar
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('hidden');
        updateCartSidebar();
    });

    // Close cart sidebar
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('hidden');
    });
});

