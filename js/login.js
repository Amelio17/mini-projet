let signUpButton = document.getElementById("sign-up");
let signInButton = document.getElementById("sign-in");
let main = document.getElementById("main");

signUpButton.addEventListener('click', () => {
    main.classList.add("right-pannel-active");
});
signInButton.addEventListener('click', () => {
    main.classList.remove("right-pannel-active");
});