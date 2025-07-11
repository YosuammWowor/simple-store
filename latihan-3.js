// Note : stack html, css, javascript, and bootstrap.
const form = document.querySelector("#search-form");

const getData = async () => {
  const request = await fetch("https://fakestoreapi.com/products");
  const response = await request.json();
  const categorys = getCategory(response);
  setCategory(categorys);

  // Action pencarian
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const categorySelect = form.elements["categorySelect"].value;
    const keyword = form.elements["searchInput"].value;

    // Manual method
    // if (!categorySelect.length) {
    //   addProductCard(response);
    // } else {
    //   let products = response.filter((product) => {
    //     if (categorySelect === product.category) {
    //       return true;
    //     }
    //   });
    //   addProductCard(products);
    // }

    // Ternary operator
    // const products =
    //   categorySelect.length || keyword.length
    //     ? response.filter(
    //         (product) =>
    //           product.category === categorySelect &&
    //           product.title.toLowerCase().includes(keyword.toLowerCase())
    //       )
    //     : response;

    // New algorithm
    const products = response.filter((product) => {
      const matchesCategory =
        !categorySelect.length || product.category === categorySelect;

      const matchesKeyword =
        !keyword.length ||
        product.title.toLowerCase().includes(keyword.toLowerCase());

      return matchesCategory && matchesKeyword;
    });

    // Explanation:
    // 1. matchesCategory will always return true if:
    // • No category is selected
    // • Or the product matches the selected category
    // 2. matchesKeyword returns true if:
    // • No keyword is given
    // • Or the product title includes the keyword
    // 3. Only products that match both conditions will be included

    addProductCard(products);
  });
};

const getCategory = (datas) => {
  let categorys = new Set();
  for (let data of datas) {
    // console.log(data);
    categorys.add(data.category);
  }
  return categorys;
};

const setCategory = (categorys) => {
  for (let category of categorys) {
    const option = document.createElement("option");
    const select = document.querySelector("#categorySelect");
    option.textContent = category;
    option.value = category;
    select.append(option);
  }
};

const addProductCard = (datas) => {
  document
    .querySelectorAll("#productContainer > div")
    .forEach((card) => card.remove());

  for (let data of datas) {
    // Declaration product card
    const div = document.createElement("div");
    const divCard = document.createElement("div");
    const img = document.createElement("img");
    const divCardBody = document.createElement("div");
    const cardTitle = document.createElement("h5");
    const cardText1 = document.createElement("p");
    const cardText2 = document.createElement("p");
    const rating = document.createElement("p");

    const productSection = document.querySelector("#productContainer");

    div.className = "col-md-4 mb-4";
    divCard.className = "card h-100 shadow-sm";
    img.src = data.image;
    img.className = "card-img-top p-3 mx-auto";
    img.alt = "Product image";
    divCardBody.className = "card-body d-flex flex-column";
    cardTitle.className = "card-title";
    cardTitle.textContent = data.title;
    cardText1.className = "card-text text-muted mb-1";
    cardText1.textContent = `Category : ${data.category}`;
    cardText2.className = "card-text mb-1";
    cardText2.textContent = `Price : ${data.price}$`;
    rating.className = "card-text";
    rating.textContent = `Rating : ${data.rating.rate} / 5`;

    divCardBody.append(cardTitle);
    divCardBody.append(cardText1);
    divCardBody.append(cardText2);
    divCardBody.append(rating);
    divCard.append(img);
    divCard.append(divCardBody);
    div.append(divCard);
    productSection.append(div);
  }
};

getData();
