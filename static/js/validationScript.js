// Check https://www.geeksforgeeks.org/program-credit-card-number-validation/
// for alternative to credit card validation

function validateEmail(){
            const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (res.test(email.value)){
                email.setCustomValidity('');
            } else {
                email.setCustomValidity("Not a Valid Email");
            }
        }

    const email = document.getElementById("email");
    const basicInfoButton = document.getElementById("basic-info");
    basicInfoButton.onclick = validateEmail;

    // const card = document.getElementById("cardNumber")
    // const paymentDetailsButton = document.getElementById("editPayment");
    // paymentDetailsButton.onclick = validateCreditCard;

