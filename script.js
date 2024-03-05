const baseUrlOne = "https://65e39cbc88c4088649f5f512.mockapi.io/api/v1/drugs";
const baseUrlTwo = "https://65e39cbc88c4088649f5f512.mockapi.io/api/v1/shopTwo";

document.getElementById("shopOneLink").addEventListener("click", async () => {
  try {
    const response = await fetch(baseUrlOne); // Отримуємо дані для першого магазину
    if (!response.ok) {
      throw new Error("Failed to fetch drugs");
    }
    const drugs = await response.json();
    updateProductContainer(drugs); // Оновлюємо вміст блоку з отриманими даними
  } catch (error) {
    console.error("Error getting drugs:", error);
  }
});

document.getElementById("shopTwoLink").addEventListener("click", async () => {
  try {
    const response = await fetch(baseUrlTwo);
    if (!response.ok) {
      throw new Error("Failed to fetch drugs");
    }
    const drugs = await response.json();
    updateProductContainer(drugs);
  } catch (error) {
    console.error("Error getting drugs:", error);
  }
});

let basketItems = []; // Об'являємо масив для зберігання елементів корзини

const addToBasket = (product) => {
  const existingProductIndex = basketItems.findIndex(
    (item) => item.id === product.id
  );
  if (existingProductIndex !== -1) {
    // Продукт уже есть в корзине, увеличиваем количество
    basketItems[existingProductIndex].quantity++; // Увеличиваем количество продукта в корзине
  } else {
    // Продукта еще нет в корзине, добавляем его
    product.quantity = 1;
    basketItems.push(product);
  }
  localStorage.setItem("basketItems", JSON.stringify(basketItems)); // Сохранение корзины в localStorage
  console.log("Product added to basket:", product);
  console.log("Basket items:", basketItems);
};

// Функція для оновлення вмісту блоку з отриманими даними
async function updateProductContainer(drugs) {
  productContainer.innerHTML = "";
  const mappedDrugs = mapDrugs(drugs);
  mappedDrugs.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
            <img src="${product.avatar}" alt="Product Avatar">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>${product.text}</p>
            <button onClick='addToBasket(${JSON.stringify(
              product
            )})'>Add</button>
        `;
    productContainer.appendChild(productDiv);
  });
}

// Функція для перетворення масиву об'єктів
const mapDrugs = (drugs) =>
  drugs.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

localStorage.setItem("basketItems", JSON.stringify(basketItems));
