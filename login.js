
const link = "http://localhost:8000/";

const user_types = [];

class user
{
    constructor(id, first_name, last_name, age, profile_picture, user_type_id)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.profile_picture = profile_picture;
        this.user_type_id = user_type_id;
    }
}

class user_type
{
    constructor(id, type){
        this.id = id;
        this.type = type;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let user_in = localStorage.getItem("user");
    if(user_in == null)
    {
        user_in = sessionStorage.getItem("user");
        if(user_in == null)
        {

            document.getElementById('auth-modal').style.display = 'block'; // Hide modal
            document.getElementById('navbar').style.display = 'none'; // Show navbar
            return;
        }

    }

    user_in = JSON.parse(user_in, new user);

    //alert("Welcome, " + user_in.user_name + "!");
    document.getElementById('auth-modal').style.display = 'none'; // Hide modal
    document.getElementById('navbar').style.display = 'block'; // Show navbar

})

// window.addEventListener("DOMContentLoaded", () => {
//     if(localStorage.getItem("user") == null && sessionStorage.getItem("user") == null)
//         return;

//     showSection('pet-type-section');
// })

async function getUserTypes() {

    return fetch(link + "user_type")
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error(response);
        }
    })
    .then(data => {
        i = 0;
        data.forEach(element => {
            user_types[i] = new user_type(element.id, element.type);
            i++;
        });
        //console.log(user_types);
    });

}

async function createUser() {

    
    if(user_types.length == 0)
        await getUserTypes();
    
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    if(!username){

        alert("Please enter a user name.");
        return;
    }
    if(!password){

        alert("Please enter a password");
        return;
    }

    // class SignUp(BaseModel):
    // user_name: str
    // password_hash: str
    // user_type_id: int

    customer_user_type = user_types.filter(x => x.type = "customer")[0].id;


    fetch(link + 'login/signup', {
        method: "POST",
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_name": username,
            "password_hash": password,
            "user_type_id": customer_user_type
        })
        
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            response.text().then(e => {
                throw new Error(e);
            })
        }
    })
    .then(data => {
        console.log(data);
    });

}

function checkUserExists(user_name) {

    return fetch(link + "user/get_by_user_name/" + user_name)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else {
            alert("User not found!");
            response.text().then(text => {
                throw new Error(text)
            })
            return null;
        }
    })
    .then(data => {
        return data;
    });
}

function cacheUser(user_in) {

    const remember = document.getElementById('login-cache').checked;

    if(remember)
        localStorage.setItem("user", JSON.stringify(user_in));

    else {
        if(localStorage.getItem("user") != null)
            localStorage.removeItem("user");

        
        sessionStorage.setItem("user", JSON.stringify(user_in));
    }

    
}

async function login_db() {

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if(!username){

        alert("Please enter a user name.");
        return;
    }
    if(!password){

        alert("Please enter a password");
        return;
    }


    user_in = JSON.parse(JSON.stringify(await checkUserExists(username)), new user)
    if(!user_in)
        return;
    
    id = -1;

    success = await fetch(link + "login/get_by_user_id/" + user_in.id)
    .then(response => {
        if(response.ok){
            return response.json()
        }
        else {
            alert("User not found!");
            return null;
        }
    })
    .then(data => {
        if(data["password_hash"] == password)
            return true;

        return false;
        
    });

    if(!success)
    {
        alert("Incorrect password")
        return;

    }
    
    cacheUser(user_in);

    if(localStorage.getItem("profileShowing"))
        showProfile();
    
    alert("Welcome, " + username + "!");
    localStorage.removeItem("loginShowing");
    document.getElementById('auth-modal').style.display = 'none'; // Hide modal
    document.getElementById('navbar').style.display = 'block'; // Show navbar
    document.getElementById('scroller-wrapper').style.display = '';
    hideProfile();

    showSection('pet-type-section');
}

function logout_db(){
    
    localStorage.clear();
    sessionStorage.clear();
    document.getElementById('auth-modal').style.display = 'block'; // Hide modal
    document.getElementById('navbar').style.display = 'none'; // Show navbar
    hideProfile();
    document.getElementById('scroller-wrapper').style.display = 'none';

    localStorage.setItem("loginShowing", "true");

    alert("You have logged out successfully.");
}

function contact() {
    showSection('contact');
    document.getElementById("scroller-wrapper").style.display = 'none';
}