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
    if (!visa || !master) return; // Exit if not on checkout page

    var cardNum = document.getElementById("cardNumber").value;
    var cvv = document.getElementById("cvvf").value;

    if ((!visa.checked && !master.checked) || cardNum == "" || cvv == "") {
        alert("Please fill in all details");
        return;
    }

    if (cardNum.length < 16) {
        alert("Card number must be 16 digits");
        return;
    }

    if (/^\d{3}$/.test(cvv)) {
        var cost_form = document.getElementById("costForm");
        if (cost_form) cost_form.style.display = "block";
        
        var totalCst = parseFloat(document.getElementById("amount").textContent);
        var deliveryC = 0;
        var netTotal = 0;

        // DELIVERY CALCULATION LOGIC
        if (totalCst < 1000) {
            deliveryC = totalCst * 0.1; // 10% Delivery
        } else {
            deliveryC = 0; // Free Delivery
        }

        netTotal = totalCst + deliveryC;

        // Display results
        const delElem = document.getElementById("delivery-cost");
        const netElem = document.getElementById("net-total");
        const totElem = document.getElementById("total-cost");

        if (totElem) totElem.innerHTML = totalCst.toFixed(2);
        if (delElem) delElem.innerHTML = deliveryC.toFixed(2);
        if (netElem) netElem.innerHTML = netTotal.toFixed(2);

        setTimeout(() => { confirmPayment(); }, 1000);
    } else {
        alert("CVV must be 3 digits");
    }
}

function confirmPayment() {
    var isConfirmed = confirm("Do you accept the total payment calculation?");
    if (isConfirmed) {
        alert("Thank you for the confirmation");
        clearBucketList();
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