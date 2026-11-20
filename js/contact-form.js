
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
        console.error("Contact form not found!");
        return;
    }

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email-address").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const recipient = "hello@examplewebsite142.com";

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            "Full Name: " + fullName + "\n" +
            "Email Address: " + email + "\n\n" +
            "Message:\n" + message
        );

        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        window.location.assign(mailtoLink);

    });

});
