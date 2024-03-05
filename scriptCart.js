// Функция для отображения продуктов в корзине
function updateProductList() {
  cartBox.innerHTML = ""; // Очищаем контейнер перед обновлением

  const storedBasketItems = localStorage.getItem("basketItems");
  const basketItems = storedBasketItems ? JSON.parse(storedBasketItems) : [];

  basketItems.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("productList");
    productDiv.innerHTML = `
        <img src="${product.avatar}" alt="Product Avatar">
        <div class='containerCart' data-price="${product.price}"> <!-- Добавляем атрибут data-price с ценой товара -->
        <h2 class="cartName" >${product.name}</h2>
        <p>Price:$${product.price}</p>
        <input type='number' min="0" max="5" value="1" class='inputNumber'>
        </div>
        `;
    cartBox.appendChild(productDiv);
  });

  const quantityInputs = document.querySelectorAll(".inputNumber");

  quantityInputs.forEach((input) => {
    input.addEventListener("input", updateTotal);
  });
}

let total = 0;

// Функция для обновления общей суммы
function updateTotal() {
  total = 0;

  const quantityInputs = document.querySelectorAll(".inputNumber");

  // Проходимся по каждому элементу input и добавляем его значение к общей сумме
  quantityInputs.forEach((input) => {
    const parentElement = input.closest(".containerCart");
    const price = parseFloat(parentElement.dataset.price);
    const quantity = parseInt(input.value);
    total += price * quantity;
  });

  console.log("Total:", total);

  const priceBox = document.getElementById("priceBox");
  priceBox.innerText = total;
}

const cartBox = document.getElementById("cartBox");

updateProductList();

updateTotal();
