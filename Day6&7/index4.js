let inventory=[];

function AddProduct(){

 const nameInput = document.getElementById('product');
            const priceInput = document.getElementById('price');
            const quantityInput = document.getElementById('Quantity');
            
            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value);
            const quantity = parseInt(quantityInput.value);

            if (name === '') {
                alert('Please enter a product name');
                return;
            }

            if (isNaN(price) || price < 0) {
                alert('Please enter a valid price');
                return;
            }

            if (isNaN(quantity) || quantity < 0) {
                alert('Please enter a valid quantity');
                return;
            }

            inventory.push({ name: name, price: price, quantity: quantity });

            nameInput.value = '';
            priceInput.value = '';
            quantityInput.value = '';

            displayInventory();
                (`${name} has been added to inventory!`);
        }

        function displayInventory() {
            const tbody = document.getElementById('inventoryBody');
            tbody.innerHTML = '';

            if (inventory.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3" class="empty-state">No products in inventory</td></tr>';
                return;
            }

            inventory.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td> `;
                tbody.appendChild(row);
            });
        }