function paymentSelected() {
      var card = document.getElementById("card");
      var cash = document.getElementById("cash");
      var form = document.getElementById("paymentDetails");

      // If the checkbox is checked, display the output text
      if (card.checked == true){
        form.style.display = "block";
        $(":input", form).prop("required", true)
        $("#save-card").prop("checked", true)
      } else {
        form.style.display = "none";
        $(":input", form).prop("required", false)
        $("#save-card").prop("checked", false)
      }

      if(card.checked || cash.checked){
        $("#next").fadeIn(1000);
      }
  }

    function prefSelected() {
      var delivery = document.getElementById("delivery");
      var pickup = document.getElementById("pickup");
      var form = document.getElementById("shippingAddress");

      // If the checkbox is checked, display the output text
      if (delivery.checked == true){
        form.style.display = "block";
        $(":input", form).prop("required", true)
        $("#save-address").prop("checked", true)
      } else {
        form.style.display = "none";
        $(":input", form).prop("required", false)
        $("#save-address").prop("checked", false)
      }

      if(delivery.checked || pickup.checked){
        $("#then").fadeIn(1000);
      }
    }

    function prefReceipt(){
      var receipt = document.getElementById("receipt");
      var imagood = document.getElementById("imagood");
      if(receipt.checked ^ imagood.checked){
        $("#finally").fadeIn(1000);
      }
      else{
        $("#finally").fadeOut(1000);
      }
    }