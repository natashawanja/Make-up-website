// --- BUCKET & BASKET LOGIC ---
var price = "";
var description = "";

// Check if clear button exists before adding listener
const clearBtn = document.getElementById("check-clear");
if (clearBtn) {
    clearBtn.addEventListener("click", clearBucketList);
}

var buyButton = document.getElementsByClassName("buyNow");
for (var btn = 0; btn < buyButton.length; btn++) {
    buyButton[btn].addEventListener("click", function () { bucketBuyNow(this); });
}

function bucketBuyNow(para) {
    var bucketList = [];
    var bucketListStr;
    var prices = "";
    var goods = "";

    while (para = para.previousSibling) {
        if (para.nodeType === 5) continue;
        if (para.className == "title") { prices = para.innerText; }
        if (para.className == "buy_item") { goods = para.innerText; }
    }

    var goods_item = { item_name: goods, cost: prices };
    var product_item = JSON.stringify(goods_item);

    if (!sessionStorage.getItem("bucketList")) {
        bucketList.push(product_item);
    } else {
        bucketList = JSON.parse(sessionStorage.getItem('bucketList'));
        bucketList.push(product_item);
    }

    bucketListStr = JSON.stringify(bucketList);
    sessionStorage.setItem('bucketList', bucketListStr);
    bucketConfirmAdd(goods);
    bucketListUpdate();
}

function bucketListUpdate() {
    var sum = 0;
    var items = 0;
    var items_total = "";

    if (sessionStorage.getItem('bucketList')) {
        var bucket = JSON.parse(sessionStorage.getItem('bucketList'));
        items = bucket.length;
        for (var j = 0; j < items; j++) {
            var bkt = JSON.parse(bucket[j]);
            var cost = parseFloat(bkt.cost.split('$')[1]);
            items_total += "<tr><td>" + bkt.item_name + "</td><td>$" + cost.toFixed(2) + "</td></tr>";
            sum += cost;
        }
    }

    // SAFE UPDATE: Only update if elements exist on the current page
    const amtElem = document.getElementById("amount");
    const listElem = document.getElementById("items-total");
    const qtyElem = document.getElementById("qty");

    if (amtElem) amtElem.innerHTML = sum.toFixed(2);
    if (listElem) listElem.innerHTML = items_total;
    if (qtyElem) qtyElem.innerHTML = items;
}

function bucketConfirmAdd(makeup_name) {
    var notification = document.getElementById("notification");
    if (notification) {
        notification.innerHTML = makeup_name + " Success!";
        if (!notification.classList.contains("confirmation")) {
            notification.classList.add("confirmation");
        }
    }
}

function clearBucketList() {
    if (sessionStorage.getItem('bucketList')) {
        sessionStorage.removeItem('bucketList');
        bucketListUpdate();
        var notification = document.getElementById("notification");
        if (notification) {
            notification.innerHTML = "";
            notification.classList.remove("confirmation");
        }
    }
}

// --- BRAND SELECTION LOGIC (Product Menu Page) ---
function updateProductDetails(brandId, priceId, descId) {
    const brand = document.getElementById(brandId);
    if (!brand) return; // Exit if not on the menu page

    let val = brand.value;
    let p = "", d = "";

    if (val === "revlon") { p = "$50"; d = "This a premium brand"; }
    else if (val === "mac") { p = "$65"; d = "This is a lovely brand"; }
    else if (val === "sleek") { p = "$78"; d = "This is a beautiful brand"; }

    const pElem = document.getElementById(priceId);
    const dElem = document.getElementById(descId);
    if (pElem) pElem.innerHTML = p;
    if (dElem) dElem.innerHTML = d;
}

function changeFunction() { updateProductDetails("eyeshadow", "eye-price", "eye-descrption"); }
function replaceFunction() { updateProductDetails("concelar", "concelar-price", "concelar-description"); }
function moveFunction() { updateProductDetails("lipstick", "lipstick-price", "lipstick-description"); }
function nextFunction() { updateProductDetails("powder", "powder-price", "powder-description"); }
function forwardFunction() { updateProductDetails("mascara", "mascara-price", "mascara-description"); }

// --- PAYMENT VALIDATION & DELIVERY LOGIC (Checkout Page) ---
function validatePaymentForm() {
    const visa = document.getElementById("visa");
    const master = document.getElementById("master");
    if (!visa || !master) return; 

    // Get Name Values
    var name1 = document.getElementById("cardnameN1").value;
    var name2 = document.getElementById("cardnameN2").value;
    var name3 = document.getElementById("cardnameN3").value;
    
    var cardNum = document.getElementById("cardNumber").value;
    var cvv = document.getElementById("cvvf").value;

    // 1. Check if empty
    if ((!visa.checked && !master.checked) || cardNum == "" || cvv == "" || name1 == "") {
        alert("Please fill in all details, including the name.");
        return;
    }

    // 2. Validate Name (Only letters allowed)
    // This regex checks if the string contains only A-Z or a-z
    var lettersOnly = /^[A-Za-z]+$/;
    if (!name1.match(lettersOnly) || (name2 !== "" && !name2.match(lettersOnly)) || (name3 !== "" && !name3.match(lettersOnly))) {
        alert("The name fields must only contain letters (no numbers or symbols).");
        return;
    }

    // validate Card Number (16 digits with spaces so 19 characters)
    if (cardNum.length < 19) {
        alert("Card number must be 16 digits");
        return;
    }

    // 4. Validate CVV
    if (/^\d{3}$/.test(cvv)) {
        var cost_form = document.getElementById("costForm");
        if (cost_form) cost_form.style.display = "block";
        
        var totalCst = parseFloat(document.getElementById("amount").textContent);
        var deliveryC = totalCst < 1000 ? totalCst * 0.1 : 0;
        var netTotal = totalCst + deliveryC;

        if (document.getElementById("total-cost")) document.getElementById("total-cost").innerHTML = totalCst.toFixed(2);
        if (document.getElementById("delivery-cost")) document.getElementById("delivery-cost").innerHTML = deliveryC.toFixed(2);
        if (document.getElementById("net-total")) document.getElementById("net-total").innerHTML = netTotal.toFixed(2);

        setTimeout(() => { confirmPayment(); }, 1000);
    } else {
        alert("CVV must be 3 digits");
    }
}
function formatCardNumber(input) {
    // Remove all non-digits (including existing spaces)
    let value = input.value.replace(/\D/g, '');
    
    // Add a space after every 4 digits
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Update the input field with the formatted string
    input.value = formattedValue;
}

function confirmPayment() {
    var isConfirmed = confirm("Do you accept the total payment calculation?");
    if (isConfirmed) {
        alert("Thank you for the confirmation");
        clearBucketList();
        const paymentForm = document.getElementById("payForm");
        if (paymentForm) {
            paymentForm.reset(); 
        }
        document.getElementById("costForm").style.display = "none";
    }
}

// --- WEATHER API LOGIC (Contact Page) ---
async function getWeather() {
  const cityInput = document.getElementById('cityInput');
  if (!cityInput) return; // Prevents errors on pages without the weather input
  
  const city = cityInput.value;
  const apiKey = '574f8f58feca2725ca0dfab25bd5ec81'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
          const resDiv = document.getElementById('weatherResult');
          if (resDiv) resDiv.style.display = 'block'; // Shows the card
          
          // Updates only the core weather details
          document.getElementById('cityName').innerText = data.name;
          document.getElementById('temp').innerText = Math.round(data.main.temp) + "°C";
          
          // We clear the suggestion text or hide it if it's not needed
          const tipElem = document.getElementById('suggestionText');
          if (tipElem) tipElem.innerText = ""; 
      } else {
          alert("City not found. Please try again.");
      }
  } catch (error) {
      console.error("Error fetching weather:", error);
  }
}