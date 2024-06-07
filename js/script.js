document.addEventListener('DOMContentLoaded', function () {
    const adminUsername = 'suri';
    const adminPassword = 'bobo1313113';

    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === adminUsername && password === adminPassword) {
                window.location.href = 'dashboard.html';
            } else {
                alert('用户名或密码错误');
            }
        });
    }

    const userLoginForm = document.getElementById('userLoginForm');
    if (userLoginForm) {
        userLoginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                window.location.href = 'dashboard.html';
            } else {
                alert('用户名或密码错误');
            }
        });
    }

    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const productName = document.getElementById('productName').value;
            const productPrice = document.getElementById('productPrice').value;
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const newProduct = {
                id: products.length + 1,
                name: productName,
                price: productPrice
            };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            alert(`添加商品: ${productName}, 价格: ${productPrice}`);
            addProductForm.reset();
            loadProducts();
        });
    }

    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const newUser = {
                username: newUsername,
                password: newPassword
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert(`添加用户: ${newUsername}, 密码: ${newPassword}`);
            addUserForm.reset();
            loadUsers();
        });
    }

    function purchaseProduct(productId) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => p.id == productId);
        if (product) {
            const purchaseRecords = JSON.parse(localStorage.getItem('purchaseRecords')) || [];
            purchaseRecords.push({
                productId: productId,
                productName: product.name,
                productPrice: product.price
            });
            localStorage.setItem('purchaseRecords', JSON.stringify(purchaseRecords));
            alert(`购买成功: ${product.name}, 价格: ${product.price}`);
        } else {
            alert('无效的商品ID');
        }
    }

    function loadProducts() {
        const productList = document.getElementById('productList');
        if (productList) {
            let products = JSON.parse(localStorage.getItem('products')) || [];
            
            // 添加默认的0元商品
            const defaultProduct = { id: 0, name: '为作者xavi点个赞', price: 0 };
            products = [defaultProduct, ...products];

            productList.innerHTML = products.map(product => `
                <div>
                    商品ID: ${product.id}, 名称: ${product.name}, 价格: ${product.price} 
                    <button onclick="purchaseProduct(${product.id})">购买</button>
                </div>
            `).join('');
        }
    }

    function loadUsers() {
        const userList = document.getElementById('userList');
        if (userList) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            userList.innerHTML = users.map(user => `<div>用户名: ${user.username}</div>`).join('');
        }
    }

    function loadPurchaseRecords() {
        const purchaseRecords = document.getElementById('purchaseRecords');
        if (purchaseRecords) {
            const records = JSON.parse(localStorage.getItem('purchaseRecords')) || [];
            purchaseRecords.innerHTML = records.map(record => `<div>商品ID: ${record.productId}, 名称: ${record.productName}, 价格: ${record.productPrice}</div>`).join('');
        }
    }

    loadProducts();
    loadUsers();
    loadPurchaseRecords();
});
