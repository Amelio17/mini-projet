const loginForm = document.getElementById("loginForm");

// fonction login avec XMLHttpRequest et getElementById
// function loginXhr() {
//     const username = document.getElementById("username");
//     const password = document.getElementById("password");
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "https://jsonplaceholder.org/uses");
//     xhr.responseType = "json";
//     xhr.send();
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4) {
//             let data = xhr.response;
//             console.log(data);
//             for (let user of data) {
//                 console.log("username : " + user["login"]["username"]);
//                 console.log("password : " + user["login"]["password"]);
//                 if (
//                     user["login"]["username"] == username.value &&
//                     user["login"]["password"] == password.value
//                 ) {
//                     window.location.href = "pages/interface.html?id=" + user["id"];
//                 }
//             }
//         }
//     };
// }

// fonction login avec fetch et formData
async function loginFetch() {
    let loginFormData = new FormData(loginForm);
    let response = await fetch("https://jsonplaceholder.org/users");

    if (response.ok) {
        let data = await response.json();
        console.log(data);
        console.log("password : " + data[0]["login"]["password"]);
        for (let user of data) {
            if (
                user["login"]["username"] == loginFormData.get("username") &&
                user["login"]["password"] == loginFormData.get("password")
            ) {
                window.location.href = "pages/interface.html?id=" + user["id"];
                loginForm.reset();
            }
        }
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

loginForm.addEventListener("submit", async(event) => {
    event.preventDefault();
    await loginFetch();
});