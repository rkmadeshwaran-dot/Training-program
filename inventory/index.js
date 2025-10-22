const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable").querySelector("tbody");

let products = [];

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const category = document.getElementById("category").value.trim();

  if (!name || !quantity || !category) {
    alert("Please fill out all fields!");
    return;
  }

  const product = { name, quantity, category };
  products.push(product);
  renderTable();
  productForm.reset();
});

function renderTable() {
  productTable.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>${product.category}</td>
      <td>
        <button class="editBtn" onclick="editProduct(${index})">Edit</button>
        <button class="deleteBtn" onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    productTable.appendChild(row);
  });
}

function editProduct(index) {
  const product = products[index];
  document.getElementById("productName").value = product.name;
  document.getElementById("quantity").value = product.quantity;
  document.getElementById("category").value = product.category;

  products.splice(index, 1);
  renderTable();
}

function deleteProduct(index) {
  products.splice(index, 1);
  renderTable();
}
