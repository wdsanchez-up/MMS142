
document.addEventListener("DOMContentLoaded", function () {

    const orderButton = document.getElementById("order-now");

    if (!orderButton) return;

    orderButton.addEventListener("click", function (event) {

        event.preventDefault();

        // Get product information
        const productName = document.getElementById("product-name").textContent.trim();

        const color = document.getElementById("product-color").value;

        const size = document.getElementById("product-size").value;

        const quantity = parseInt(
            document.getElementById("product-quantity").value
        ) || 1;

        // Product price
        const price = 499;
        const total = price * quantity;

        // Email details
        const recipient = "orders@examplewebsite142.com";

        const subject = encodeURIComponent(
            "Order Request - " + productName
        );

        const body = encodeURIComponent(
            "Hello! I would like to place an order.\n\n" +

            "PRODUCT DETAILS\n" +
            "Product: " + productName + "\n" +
            "Color: " + color + "\n" +
            "Size: " + size + "\n" +
            "Quantity: " + quantity + "\n\n" +

            "ORDER SUMMARY\n" +
            "Unit Price: ₱" + price + "\n" +
            "Total Amount: ₱" + total + "\n\n" +

            "Thank you!"
        );

        // Open customer's email application
        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + subject +
            "&body=" + body;

        window.location.href = mailtoLink;

    });

});
