bucketListUpdate()
// this function is for the description and the properties
var price = "";
var description = "";

//this function is for the bucket list
document.getElementById("check-clear").addEventListener("click", clearBucketList);
var buyButton = document.getElementsByClassName("buyNow");

//this function is to add items to the bucket list
for (var btn = 0; btn < buyButton.length; btn++) {
  buyButton[btn].addEventListener("click", function () { bucketBuyNow(this); });
}
//this function is to store items in the session storage
function bucketBuyNow(para) {
  var products = [];
  var prices;
  var goods;
  var bucketList = [];
  var bucketListStr;

  // this while loop is to get the item name and price
  while (para = para.previousSibling) {


    if (para.nodeType === 5) continue;

    if (para.className == "title") {
      prices = para.innerText;

    }
    if (para.className == "buy_item") {
      goods = para.innerText;

    }
    products.push(para);
  }
  // this object is to store the item name and price
  var goods_item = {
    item_name: goods,
    cost: prices
  };
 // this variable is to convert the object into a string
  var product_item = JSON.stringify(goods_item);
  // this condition is to check if the session storage is empty or not
  // the session storage is used to store the bucket list items
  if (!sessionStorage.getItem("bucketList")) {
    bucketList.push(product_item);

    bucketListStr = JSON.stringify(bucketList);


    sessionStorage.setItem('bucketList', bucketListStr);
    bucketConfirmAdd(goods);
    bucketListUpdate();

  } else {
    bucketList = JSON.parse(sessionStorage.getItem('bucketList'));
    bucketList.push(product_item);

    bucketListStr = JSON.stringify(bucketList);
    sessionStorage.setItem('bucketList', bucketListStr);
    bucketConfirmAdd(goods);
    bucketListUpdate();
  }
}
//this function is to update the bucket list
function bucketListUpdate() {
  var sum = 0;
  var cost = 0;
  var items = 0;
  var item_name = "";
  var items_total = "";
  //this condition is to check if the session storage is empty or not
  if (sessionStorage.getItem('bucketList')) {

    var bucket = JSON.parse(sessionStorage.getItem('bucketList'));

    items = bucket.length;
    // this for loop is to calculate the total cost and display the items in the bucket list
    for (var j = 0; j < items; j++) {
      var bkt = JSON.parse(bucket[j]);

      cost = parseFloat(bkt.cost.split('$')[1]);

      item_name = bkt.item_name;


      items_total += "<tr><td>" + item_name + "</td><td>$" + cost.toFixed(2) + "</td></tr>";
      sum += cost;
    }
  }

  document.getElementById("amount").innerHTML = sum.toFixed(2);
  document.getElementById("items-total").innerHTML = items_total;
  document.getElementById("qty").innerHTML = items;

}
//this function is to confirm addition to the bucket list
function bucketConfirmAdd(makeup_name) {
  var confirmation = makeup_name + " Success!";
  var notification = document.getElementById("notification");
  notification.innerHTML = confirmation;
  //this condition is to add the confirmation class to the notification div
  if (!notification.classList.contains("confirmation")) {
    notification.classList.add("confirmation");
  }

}
//this function is to clear the bucket list
function clearBucketList() {
  if (sessionStorage.getItem('bucketList')) {
    sessionStorage.removeItem('bucketList');
    bucketListUpdate();

    var notification = document.getElementById("notification");
    notification.innerHTML = "";

    if (notification.classList.contains("confirmation")) {
      notification.classList.remove("confirmation");
    }
  }
}

// this function is for the eyeshadow description and price

function changeFunction() {
  var eyeshadowBrand = document.getElementById("eyeshadow").value;
  if (eyeshadowBrand == "revlon") {
    price = "$50";
    description = "This a premium brand";

  } else if (eyeshadowBrand == "mac") {
    price = "$65";
    description = "This is a lovely brand";

  } else if (eyeshadowBrand == "sleek") {
    price = "$78";
    description = "This is a beautiful brand";
  }
  document.getElementById("eye-price").innerHTML = price;
  document.getElementById("eye-descrption").innerHTML = description;
}

// this function is for the concelar description and price
function replaceFunction() {
  var concelarBrand = document.getElementById("concelar").value;
  if (concelarBrand == "revlon") {
    price = "$35";
    description = "This a premium brand";

  } else if (concelarBrand == "mac") {
    price = "$60";
    description = "This is a lovely brand";

  } else if (concelarBrand == "sleek") {
    price = "$57";
    description = "This is a beautiful brand";
  }
  document.getElementById("concelar-price").innerHTML = price;
  document.getElementById("concelar-description").innerHTML = description;
}

// this function is for the lipstick description and price
function moveFunction() {
  var lipstickBrand = document.getElementById("lipstick").value;
  if (lipstickBrand == "revlon") {
    price = "$40";
    description = "This a premium brand";

  } else if (lipstickBrand == "mac") {
    price = "$70";
    description = "This is a lovely brand";

  } else if (lipstickBrand == "sleek") {
    price = "$45";
    description = "This is a beautiful brand";
  }
  document.getElementById("lipstick-price").innerHTML = price;
  document.getElementById("lipstick-description").innerHTML = description;
}

// this function is for the powder description and price
function nextFunction() {
  var powderBrand = document.getElementById("powder").value;
  if (powderBrand == "revlon") {
    price = "$55";
    description = "This a premium brand";

  } else if (powderBrand == "mac") {
    price = "$25";
    description = "This is a lovely brand";

  } else if (powderBrand == "sleek") {
    price = "$39";
    description = "This is a beautiful brand";
  }
  document.getElementById("powder-price").innerHTML = price;
  document.getElementById("powder-description").innerHTML = description;
}


// this function is for the mascara description and price
function forwardFunction() {
  var mascaraBrand = document.getElementById("mascara").value;
  if (mascaraBrand == "revlon") {
    price = "$60";
    description = "This a premium brand";

  } else if (mascaraBrand == "mac") {
    price = "$39";
    description = "This is a lovely brand";

  } else if (mascaraBrand == "sleek") {
    price = "$46";
    description = "This is a beautiful brand";
  }
  document.getElementById("mascara-price").innerHTML = price;
  document.getElementById("mascara-description").innerHTML = description;
}

// this function is for validating the form

function validateForm() {
  var name = document.getElementById("name").value;
  var surname = document.getElementById("surname").value;
  var comments = document.getElementById("comments").value;
  var nameRegex = /^[A-Za-z]+$/;
  if (name == "" || surname == "" || comments == "") {
    alert("Please fill out all of the fields.");
    return false;
  }
  if (!nameRegex.test(name) || !nameRegex.test(surname)) {
    alert("Names must contain only letters (no numbers or symbols).");
    return false;
  }
   else {
    alert("Thank you for submitting your additional comments");
    return true;
  }
}
// this function is to validate that the right info has been entered in the contact form for example not entering numbers in the name, surname field
function validateContactForm() {
  var name = document.getElementById("name").value;
  var surname = document.getElementById("surname").value;
  var nameRegex = /^[A-Za-z]+$/;

  if (!nameRegex.test(name) || !nameRegex.test(surname)) {
    alert("Names must contain only letters (no numbers or symbols).");
    return false;
  } else {
    alert("Thank you for submitting your additional comments");
    return true;
  }
}



// this function is for validating the payment form
function validatePaymentForm() {
  var visa = document.getElementById("visa").checked; // Use .checked for radio buttons
  var master = document.getElementById("master").checked;
  var cardNum = document.getElementById("cardNumber").value;
  var month = document.getElementById("month").value;
  var cardName1 = document.getElementById("cardnameN1").value;
  var cardName2 = document.getElementById("cardnameN2").value;
  var cardName3 = document.getElementById("cardnameN3").value;
  var year = document.getElementById("year").value;
  var cvv = document.getElementById("cvvf").value;

  // 1. First, check if anything is empty
  if ((!visa && !master) || cardNum == "" || month == "" || year == "" || cvv == "") {
    alert("fill details");
  } else {
    if (!/^\d+$/.test(cardNum)) {
      alert("Card number must contain only numbers (no letters or symbols).");
      return;
    }
    // 2. ADD THE CARD NUMBER LENGTH CHECK HERE
    if (cardNum.replace(/\s/g, '').length < 16) {
      alert("Card number must be 16 digits");
      return; // Stop the function here if the card is too short
    }
    var nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(cardName1) || (cardName2 !== "" && !nameRegex.test(cardName2)) || !nameRegex.test(cardName3)) {
    alert("Names must contain only letters (no numbers or symbols).");
    return;
    }
    // 5. CVV: MUST be numerals only
    if (!/^\d{3}$/.test(cvv)) {
    alert("CVV must be exactly 3 numbers.");
    return;
    }

    // 3. Now check CVV length
    if(cvv >= 100 && cvv <= 999) {
      var cost_form = document.getElementById("costForm");
      cost_form.style.display = "block";
      
      // 4. Calculate total cost, delivery cost, and net total
      totalCst = document.getElementById("amount").textContent;
      document.getElementById("total-cost").innerHTML = totalCst;
      // Delivery cost calculation
      if (parseFloat(totalCst) < 1000) {
        deliveryC = parseFloat(totalCst) * 0.1;
        netTotal = parseFloat(totalCst) + deliveryC;
        document.getElementById("delivery-cost").innerHTML = deliveryC.toFixed(2);
        document.getElementById("net-total").innerHTML = netTotal.toFixed(2);
      } else {
        deliveryC = 0;
        netTotal = parseFloat(totalCst) + deliveryC;
        document.getElementById("delivery-cost").innerHTML = deliveryC.toFixed(2);
        document.getElementById("net-total").innerHTML = netTotal.toFixed(2);
      }
      // 5. Confirm payment after a short delay
      setTimeout(() => {
        confirmPayment();
      }, 1000);
      
    } else {
      alert("CVV can only be 3 digits");
    }
  }
}
// this function is for confirming the payment
function confirmPayment() {
  var confirmPayment = confirm("Do you accept the total payment calculation?");
  var cost_form = document.getElementById("costForm");

  if (confirmPayment == true) {
    alert("Thank you for the confirmation");
    clearBucketList();
    cost_form.style.display = "none";
    clearPaymentInputs();
  } else {
    alert("Application has been withdrawn");
    cost_form.style.display = "none";
  }
}
// this function is for clearing the payment inputs
function clearPaymentInputs() {
  // Clearing card details and CVV fields
  document.getElementById("visa").value = "";
  document.getElementById("master").value = "";
  document.getElementById("month").value = "";
  document.getElementById("cardnameN1").value = "";
  document.getElementById("cardnameN2").value = "";
  document.getElementById("cardnameN3").value = "";
  document.getElementById("year").value = "";
  document.getElementById("cvvf").value = "";
}
// this function is for getting the weather information
async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = '574f8f58feca2725ca0dfab25bd5ec81'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
          document.getElementById('weatherResult').style.display = 'block';
          document.getElementById('cityName').innerText = data.name;
          document.getElementById('temp').innerText = Math.round(data.main.temp) + "°C";
          
          // --- NEW SUGGESTION LOGIC ---
          const weatherMain = data.weather[0].main; // e.g., "Clear", "Rain", "Clouds"
          const temp = data.main.temp;
          let tip = "";

          if (weatherMain === "Clear") {
              tip = "☀️ It's sunny! Don't forget your SPF 50 Foundation and Lip Balm.";
          } else if (weatherMain === "Rain") {
              tip = "🌧️ Rainy day! We recommend our Waterproof Mascara and Eyeliner.";
          } else if (temp < 15) {
              tip = "❄️ Cold weather! Use a Hydrating Primer to prevent dry skin.";
          } else if (temp > 25) {
              tip = "🔥 It's hot! Use a Matte Setting Spray to keep your makeup in place.";
          } else {
              tip = "✨ Perfect weather! Any of our Premium Lipsticks would look great today.";
          }

          document.getElementById('suggestionText').innerText = tip;
          // ----------------------------
      }
  } catch (error) {
      console.error("Error:", error);
  }
}