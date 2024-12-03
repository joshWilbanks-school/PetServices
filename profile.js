

document.addEventListener("DOMContentLoaded", () => {

    let showing = localStorage.getItem("profileShowing");
    if(showing === null)
        hideProfile();
    else
        showProfile();
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
    let userObj = JSON.parse(localStorage.getItem("user"), new user);
    if(userObj === null)
        return;

    localStorage.setItem("profileShowing", "true");
    //{"id":8,"user_name":"asdf","first_name":null,"last_name":null,"age":null,"profile_picture":null,"user_type_id":1,"user_type":{"id":1,"type":"customer"}}
    if(userObj.user_type.type === "customer")
        showCustomerProfile();

    else
        showServiceProfile();
}

function hideProfile()
{
    
    let scroller = document.getElementById("scroller-wrapper");
    scroller.setAttribute("class", "scroller-wrapper")

    document.getElementById("profile").setAttribute("style", "display: none;");
    document.getElementById("scroller-wrapper").setAttribute("style", "");

    localStorage.removeItem("profileShowing");
}

function showCustomerProfile()
{

        
    let scroller = document.getElementById("scroller-wrapper");
    scroller.setAttribute("class", "scroller-wrapper-profile")


    document.getElementById("profile").setAttribute("style", "");
    document.getElementById("scroller-wrapper").setAttribute("style", "display: none;");
    document.getElementById("profile-reviews-scroller").setAttribute("style", "display: none;");
    
}

function showServiceProfile()

{    let scroller = document.getElementById("scroller-wrapper");
    scroller.setAttribute("class", "scroller-wrapper-profile")
    let template = document.getElementById("review-template")
    let content = template.content;
    for(i = 0; i < 10; i++)
    {
        let clone = content.cloneNode(true);
        document.getElementById("profile-reviews-scroller").appendChild(clone);

    }
    document.getElementById("profile").setAttribute("style", "");
    document.getElementById("scroller-wrapper").setAttribute("style", "");
    document.getElementById("profile-reviews-scroller").setAttribute("style", "");
}