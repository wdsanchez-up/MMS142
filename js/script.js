document.addEventListener("DOMContentLoaded", function () {

    const thumbnails = document.querySelectorAll(".thumbnail");
    const mainImage = document.getElementById("mainProductImage");
    const colorButtons = document.querySelectorAll(".color-btn");
    const colorInput = document.getElementById("product-color");
    const sizeButtons = document.querySelectorAll(".size-btn");
    const sizeInput = document.getElementById("product-size");
    const quantityInput = document.getElementById("product-quantity");
    const decreaseButton = document.getElementById("decrease-quantity");
    const increaseButton = document.getElementById("increase-quantity");
    const orderLink = document.getElementById("order-now");
    const contactForm = document.getElementById("contact-form");

    function showImage(src, alt) {
        if (!mainImage || !src) {
            return;
        }

        mainImage.style.opacity = "0";

        setTimeout(function () {
            mainImage.src = src;
            if (alt) {
                mainImage.alt = alt;
            }
            mainImage.style.opacity = "1";
        }, 150);

        thumbnails.forEach(function (item) {
            item.classList.toggle("active", item.dataset.image === src);
        });
    }

    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener("click", function () {
            showImage(this.dataset.image, this.dataset.alt);

            colorButtons.forEach(function (button) {
                button.classList.toggle("active", button.dataset.image === thumbnail.dataset.image);
            });

            const activeColor = document.querySelector(".color-btn.active");
            if (colorInput && activeColor) {
                colorInput.value = activeColor.dataset.color;
            }

            updateOrderLink();
        });
    });

    colorButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            colorButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            if (colorInput) {
                colorInput.value = this.dataset.color;
            }

            showImage(this.dataset.image, this.dataset.alt);
            updateOrderLink();
        });
    });

    sizeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            sizeButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            if (sizeInput) {
                sizeInput.value = this.dataset.size;
            }

            updateOrderLink();
        });
    });

    if (decreaseButton && quantityInput) {
        decreaseButton.addEventListener("click", function () {
            let quantity = parseInt(quantityInput.value, 10) || 1;

            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }

            updateOrderLink();
        });
    }

    if (increaseButton && quantityInput) {
        increaseButton.addEventListener("click", function () {
            let quantity = parseInt(quantityInput.value, 10) || 1;
            quantityInput.value = quantity + 1;
            updateOrderLink();
        });
    }

    if (quantityInput) {
        quantityInput.addEventListener("change", updateOrderLink);
    }

    function updateOrderLink() {
        if (!orderLink) {
            return;
        }

        const productName = document.getElementById("product-name");
        const price = document.querySelector(".product-price");
        const name = productName ? productName.textContent.trim() : "T-shirt";
        const color = colorInput ? colorInput.value : "";
        const size = sizeInput ? sizeInput.value : "";
        const quantity = quantityInput ? quantityInput.value : "1";
        const priceText = price ? price.textContent.trim() : "₱499";
        const body = [
            "Hello Spring,",
            "",
            "I would like to order:",
            "",
            "Product: " + name,
            "Color: " + color,
            "Size: " + size,
            "Quantity: " + quantity,
            "Price: " + priceText,
            "",
            "Thank you."
        ].join("\n");

        orderLink.href = "mailto:orders@examplewebsite142.com?subject="
            + encodeURIComponent("Order: " + name)
            + "&body="
            + encodeURIComponent(body);
    }

    updateOrderLink();

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("full-name").value.trim();
            const email = document.getElementById("email-address").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();
            const body = [
                "Name: " + name,
                "Email: " + email,
                "",
                message
            ].join("\n");

            window.location.href = "mailto:hello@examplewebsite142.com?subject="
                + encodeURIComponent(subject)
                + "&body="
                + encodeURIComponent(body);
        });
    }

});
