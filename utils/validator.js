const {check} = require('express-validator')
module.exports = {
    
  validateCardNumber : check('paymentDetails[cardNumber]')
  
    // To delete leading and trailing space
    .trim()
  
    // Validate height to accept
    // only decimal number
    .isCreditCard()
  
    // Custom message
    .withMessage('Must be a valid credit card number')   
}