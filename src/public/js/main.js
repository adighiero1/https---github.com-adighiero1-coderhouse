


console.log("connected");

const socket = io();

socket.on("products", (data) => {
    printProducts(data);
});

// Function to render products
const printProducts = (products) => {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    products.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = ` 
            <p> Product ID: ${item.id} </p>
            <p> Product: ${item.title} </p>
            <p> Price: ${item.price} </p>
            <button> Delete </button>
        `;

        productContainer.appendChild(card);

        // Add event listener to delete button
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        });
    });
};




const addProduct = () => {
    console.log("Adding product...");
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };
    console.log("Sending product:", product);
    socket.emit("addProduct", product);
};

// Function to delete a product
const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
};