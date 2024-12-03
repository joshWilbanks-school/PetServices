
const users = []
const usersDic = {}

document.addEventListener("DOMContentLoaded", () => {

    localStorage.removeItem("displayEdit");

    loadServices(() => {

        fetch(link + "user")
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error(response);
            }
        })
        .then(data => {
            let i = 0;
            data.forEach(element => {
                users[i] = element;
                usersDic[element.id] = element;
                i++;
            });
        })
        .finally(() => {
                    
            let showing = localStorage.getItem("profileShowing");
            if(showing === null)
                hideProfile();
            else
                showProfile();
        })
    })
});

function toggleProfile()
{
    
    let showing = localStorage.getItem("profileShowing");

    if(showing === null)
        showProfile();
    else
        hideProfile();
}

function showProfile()
{
    let user_str = localStorage.getItem("user");
    if(user_str === null)
        user_str = sessionStorage.getItem("user");

    let userObj = JSON.parse(user_str, new user);
    if(userObj === null)
        return;


    localStorage.setItem("profileShowing", "true");


    //{"id":8,"user_name":"asdf","first_name":null,"last_name":null,"age":null,"profile_picture":null,"user_type_id":1,"user_type":{"id":1,"type":"customer"}}
    if(userObj.user_type.type === "customer")
        showCustomerProfile(userObj);

    else
        showServiceProfile(userObj.id);
}

function hideProfile()
{
    
    let scroller = document.getElementById("scroller-wrapper");
    scroller.setAttribute("class", "scroller-wrapper")

    document.getElementById("profile").setAttribute("style", "display: none;");
    document.getElementById("scroller-wrapper").setAttribute("style", "");

    localStorage.removeItem("profileShowing");
}

function showCustomerProfile(user)
{

        
    let scroller = document.getElementById("scroller-wrapper");
    scroller.setAttribute("class", "scroller-wrapper-profile")


    document.getElementById("profile").setAttribute("style", 'display: auto');
    document.getElementById("scroller-wrapper").setAttribute("style", "display: none;");
    document.getElementById("profile-reviews-scroller").setAttribute("style", "display: none;");
    
    setProfileInfo(user)
}

function showServiceProfile(user_id)
{   
    let scroller = document.getElementById("scroller-wrapper");
    scroller.setAttribute("class", "scroller-wrapper-profile")
    if(localStorage.getItem("loginShowing"))
        return;

    let template = document.getElementById("review-template")
    let content = template.content;

    let serviceProvider = serviceProviderDic[user_id];
    let reviews = userReviewDic[serviceProvider.id];

    for(i = 0; i < reviews.length; i++)
    {
        let clone = content.cloneNode(true);
        clone.getElementById("review").setAttribute("id", "review " + i);
        document.getElementById("profile-reviews-scroller").appendChild(clone);

        clone = document.getElementById("review " + i);

        setReview(clone, reviews[i]);

        
        // let user_services = Object.values(serviceUserDic)[i];
        // let clone = content.cloneNode(true);
        // let r_clone = review_content.cloneNode(true);

        // clone.getElementById("service id").setAttribute("id", "service " + i);

        // document.getElementById("scroller").appendChild(clone);
        // clone = document.getElementById("service " + i);
        // clone.querySelector("#"+"cat-dog-review-section").appendChild(r_clone);
        // r_clone = clone.querySelector("#"+"review");

    }


    document.getElementById("profile").setAttribute("style", "");
    document.getElementById("scroller-wrapper").setAttribute("style", "");
    document.getElementById("profile-reviews-scroller").setAttribute("style", "");

    let user = usersDic[user_id];
    setProfileInfo(user);


}

function setProfileInfo(user)
{
    let profile = document.getElementById("profile-basic-info");
    
    let name = profile.querySelector("#" + "profile-full-name");
    let u_name = profile.querySelector("#" + "profile-user-name");
    let contact = profile.querySelector("#"+"profile-contact-info");
    let bio = profile.querySelector("#" + "profile-bio");
    let edit_btn = profile.querySelector("#"+"profile-edit-button");

    name.innerText = ""

    if(user.first_name != null)
        name.innerText = capitalize(user.first_name);

    if(user.last_name != null)
        name.innerText += " " + capitalize(user.last_name);


    u_name.innerText = "@" + user.user_name.toLowerCase();

    if(user.biography != null)
        bio.innerHTML = "<h5 class=\"profile-bio-header\">Biography</h5>" + user.biography;
    else
        bio.innerHTML = "<h5 class=\"profile-bio-header\">Biography</h5>"
    contact.innerText = user.contact_info;

    let stored_user = localStorage.getItem("user");
    if(stored_user == null)
        stored_user = sessionStorage.getItem("user")

    if(JSON.parse(stored_user).id != user.id)
        edit_btn.setAttribute("style", "display: none");
    else
        edit_btn.removeAttribute("style");

}

function toggleEditProfile()
{
    let displayEdit = localStorage.getItem("displayEdit");
    if(displayEdit == null)
    {
        localStorage.setItem("displayEdit", "true");
        setEditProfileDefaultValues();
        document.getElementById("edit-profile").style.display = 'block';
    }
    else
    {
        localStorage.removeItem("displayEdit");
        document.getElementById("edit-profile").style.display = 'none';
    }
}

function setEditProfileDefaultValues()
{
    let user = localStorage.getItem("user");
    if(user == null)
        user = sessionStorage.getItem("user");

    user = JSON.parse(user);

    if(user.first_name != null)
        setTextValue("edit-first-name", user.first_name);
    if(user.last_name != null)
        setTextValue("edit-last-name", user.last_name);

    setTextValue("edit-user-name", user.user_name);
    
    if(user.contact_info != null)
        setTextValue("edit-contact-info", user.contact_info);

    if(user.biography != null)
        setTextValue("edit-bio", user.biography);

}

function getTextValue(id)
{
    return document.getElementById(id).value;
}

function setTextValue(id, val)
{
    
    document.getElementById(id).value = val;
}

function saveEdit()
{
    let fname = getTextValue("edit-first-name");
    let lname = getTextValue("edit-last-name");
    let uname = getTextValue("edit-user-name");
    let cinfo = getTextValue("edit-contact-info");
    let bio = getTextValue("edit-bio");

    console.log(fname);

    let local = true;
    let user = localStorage.getItem("user");
    if(user == null)
    {

        user = sessionStorage.getItem("user");
        local = false;
    }

    user = JSON.parse(user);

    if(fname.trim() != "")
        user.first_name = fname;

    if(lname.trim() != "")
        user.last_name = lname;

    if(uname.trim() != "")
        user.user_name = uname;

    user.contact_info = cinfo;
    user.biography = bio;
    console.log(JSON.stringify(user));
    fetch(link + "user/" + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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
        if(local)
            localStorage.setItem("user", JSON.stringify(data));
        else
            sessionStorage.setItem("user", JSON.stringify(data));

        setProfileInfo(data);
        toggleEditProfile();
    })
}