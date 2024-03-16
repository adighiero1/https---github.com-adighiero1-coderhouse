//crating socket instance
const socket = io(); 

//creating variable to to save the username.
let user; 
const chatBox = document.getElementById("chat");

//Sweet Alert 2  is a library to create alerts

//Swal  is the object that will let us use methods from the library

//Fire  is a method from the library that lets use configure the alert.

Swal.fire({
    title: "Identify", 
    input: "text",
    text: "Enter a username to identify yourself", 
    inputValidator: (value) => {
        return !value && "Need to write a name to continue"
    }, 
    allowOutsideClick: false,
}).then( result => {
    user = result.value;
})


chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {

            socket.emit("message", {user: user, message: chatBox.value}); 
            chatBox.value = "";
        }
    }
})



socket.on("message", data => {
    let log = document.getElementById("messages");
    let messages = "";

    data.forEach( message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`
    })

    log.innerHTML = messages;
})