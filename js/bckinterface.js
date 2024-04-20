// reccupération des paramètres d'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get("id");

//pour le form user 
const userForm = document.getElementById("userForm");
let userFormData = new FormData(userForm);
const Nmuser = document.getElementById("Nmuser");
const yourName = document.getElementById("yourName");
const bio = document.getElementById("bio");

//bouton deco et post et comment
const deconnecter = document.getElementById("lien");
const postclick = document.getElementById("postclick");
const infoclick = document.getElementById("infoclick");
const comsclick = document.getElementById("comsclick");

//pour le post form
const postForm = document.getElementById('postForm');
let postFormData = new FormData(postForm);


// fonction pour aplatir un objet
function flattenObject(obj) {
    let result = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newKey = key;

            if (typeof obj[key] === "object" && obj[key] !== null) {
                Object.assign(result, flattenObject(obj[key], newKey));
            } else {
                result[newKey] = obj[key];
            }
        }
    }

    return result;
}

// getUserDetails reccupère les infos users avec fetch et formData
async function getUserDetailsFetch(id) {
    let response = await fetch("https://jsonplaceholder.org//users?id=" + id);

    if (response.ok) {
        let data = await response.json();
        yourName.textContent = data["firstname"].toUpperCase();
        // + " " + data["lastname"];
        Nmuser.textContent = " @" + data["login"]["username"];
        bio.textContent = data["company"]["catchPhrase"];
        userForm.nom.value = data["firstname"];
        userForm.prenom.value = data["lastname"];
        userForm.username.value = data["username"];
        userForm.email.value = data["email"];
        userForm.adress.value = data["address"]["suite"] + ",  " + data["address"]["street"];
        userForm.ville.value = data["address"]["city"];
        userForm.codepostal.value = data["address"]["zipcode"];
        console.log(data);
        console.log(flattenObject(data));
        console.log(userFormData.keys());
        for (let key of userFormData.keys()) {
            const input = userForm.elements[key];
            input.value = flattenObject(data)[key];
        }
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

getUserDetailsFetch(userId);

async function setUserDetails(id) {
    let response = await fetch("https://jsonplaceholder.org/users", {
        method: "POST",
        body: userFormData,
    });
    if (response.ok) {
        alert("enregistrer avec succès");
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

userForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    setUserDetails(userId);
});
deconnecter.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = "../login.html";
    // bloquePrecedent();
    // history.pushState(null, '', '../pages/interface.html');
    // window.addEventListener('popstate', function(event) {
    //     event.preventDefault();
    //     this.history.pushState(null, '', '../pages/interface.html');
    // });
});

// function bloquePrecedent() {

// }

//resaka post  sy coms eto boana
async function getposts(id) {
    try {
        const response = await fetch("https://jsonplaceholder.org//posts?id=" + id);
        if (response.ok) {
            const posts = await response.json();
            displayPosts(posts);
        } else { console.error("erreur HTTP:" + response.status); }

    } catch (error) {
        console.error("erreur lors de la recuperation :", error);
    }
}

function displayPosts(posts) {
    const container = document.getElementById('pubUser');
    //filtrer les cible
    const postUser2 = posts.filter(post => post.userId == userId);
    //affiche les cible filtrer
    // if (true){}
    //else{ }
    postUser2.forEach(post => {
        const postdiv = document.createElement('div');
        postdiv.className = 'post';
        postdiv.innerHTML = `
                <h4>${post.slug}</h4>
                <h2>${post.userId}</h2>
                <span>${post.title}</span>
                <p>${post.content}</p>
                <image src='${post.image}' alt='${post.thumbnail}'>
                <span>${post.status}</span>
                <span>${post.publishedAt}</span>    
            `;
        container.appendChild(postdiv);
    });
}

//bouton jiab reto besta boit ty
postclick.addEventListener('click', function(event) {
    event.preventDefault();
    userForm.style.display = 'none';
    postForm.style.display = 'block';
    getposts(userId);
});
infoclick.addEventListener('click', function(event) {
    event.preventDefault();
    userForm.style.display = 'block';
    postForm.style.display = 'none';
});
comsclick.addEventListener('click', function(event) {
    event.preventDefault();
    alert('oka zay fa ndao mijosy ');
});