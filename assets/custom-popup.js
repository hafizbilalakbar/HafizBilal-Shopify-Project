document.addEventListener('DOMContentLoaded', function() {
    const plusIcons = document.querySelectorAll('.product__plus-icon');
    const popup = document.getElementById('product-popup');
    const closePopup = document.getElementById('close-popup');

    plusIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            const productHandle = this.getAttribute('data-product-handle');
            fetchProductDetails(productHandle);
        });
    });

    closePopup.addEventListener('click', function() {
        popup.classList.add('hidden');
    });

    function fetchProductDetails(handle) {
        fetch(`/products/${handle}.js`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('popup-product-image').src = product.featured_image;
                document.getElementById('popup-product-title').innerText = product.title;
                document.getElementById('popup-product-price').innerText = product.price;
                document.getElementById('popup-product-description').innerText = product.description;

                const variantsSelect = document.getElementById('popup-product-variants');
                variantsSelect.innerHTML = '';
                product.variants.forEach(variant => {
                    const option = document.createElement('option');
                    option.value = variant.id;
                    option.innerText = variant.title;
                    variantsSelect.appendChild(option);
                });

                popup.classList.remove('hidden');
            });
    }
});
