
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

    // PRODUCT GALLERY
    function showImage(src, alt) {
        if (!mainImage || !src) return;

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
                button.classList.toggle(
                    "active",
                    button.dataset.image === thumbnail.dataset.image
                );
            });

            const activeColor = document.querySelector(".color-btn.active");

            if (colorInput && activeColor) {
                colorInput.value = activeColor.dataset.color;
            }

            updateOrderLink();
        });
    });

    // COLOR SELECTION
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

    // SIZE SELECTION
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

    // QUANTITY CONTROLS
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
        quantityInput.addEventListener("change", function () {

            let quantity = parseInt(quantityInput.value, 10);

            if (!Number.isFinite(quantity) || quantity < 1) {
                quantity = 1;
            }

            quantityInput.value = quantity;

            updateOrderLink();
        });
    }

    // ORDER NOW EMAIL FUNCTION
    function updateOrderLink() {

        if (!orderLink) return;

        const productElement = document.getElementById("product-name");
        const priceElement = document.querySelector(".product-price");

        const productName = productElement
            ? productElement.textContent.trim()
            : "T-shirt";

        const color = colorInput ? colorInput.value : "Not selected";
        const size = sizeInput ? sizeInput.value : "Not selected";

        const quantity = Math.max(
            1,
            parseInt(quantityInput ? quantityInput.value : "1", 10) || 1
        );

        const unitPrice = 499;
        const totalPrice = unitPrice * quantity;

        const body = [
            "Hello Spring,",
            "",
            "I would like to place an order.",
            "",
            "PRODUCT DETAILS",
            "Product: " + productName,
            "Color: " + color,
            "Size: " + size,
            "Quantity: " + quantity,
            "",
            "ORDER SUMMARY",
            "Unit Price: ₱" + unitPrice,
            "Total Amount: ₱" + totalPrice,
            "",
            "Thank you!"
        ].join("\n");

        const recipient = "orders@examplewebsite142.com";

        const subject = encodeURIComponent(
            "Order Request - " + productName
        );

        const emailBody = encodeURIComponent(body);

        orderLink.href =
            "mailto:" + recipient +
            "?subject=" + subject +
            "&body=" + emailBody;
    }

    updateOrderLink();

    // CONTACT FORM EMAIL FUNCTION
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
                "Message:",
                message
            ].join("\n");

            window.location.href =
                "mailto:hello@examplewebsite142.com?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(body);
        });
    }

});
