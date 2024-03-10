

// Log a message to indicate that the script is connected
console.log("connected");

// Create a socket connection
const socket = io();

// Listen for the "products" event from the server and call printProducts with the received data
socket.on("products", (data) => {
    printProducts(data);
});

// Function to render products on the client side
const printProducts = (products) => {
    // Get the container element where products will be displayed
    const productContainer = document.getElementById("productContainer");
    // Clear the container
    productContainer.innerHTML = "";

    // Loop through each product and create a card element for it
    products.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Set the inner HTML of the card with product information
        card.innerHTML = ` 
            <p> Product ID: ${item.id} </p>
            <p> Product: ${item.title} </p>
            <p> Price: ${item.price} </p>
            <button> Delete </button>
        `;

        // Append the card to the product container
        productContainer.appendChild(card);

        // Add event listener to the delete button to delete the product
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        });
    });
};

// Function to add a product
const addProduct = () => {
    // Create a product object with values from input fields
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
    // Log the product being sent
    console.log("Sending product:", product);
    // Emit an "addProduct" event with the product data
    socket.emit("addProduct", product);
};

// Function to delete a product
const deleteProduct = (id) => {
    // Emit a "deleteProduct" event with the product ID to delete
    socket.emit("deleteProduct", id);
};







