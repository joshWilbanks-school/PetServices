

const services = [];
const serviceProviders = [];
const reviews = [];
const serviceUserDic = {};
const serviceProviderDic = {};
const userReviewDic = {};
let cats = [];
let dogs = [];



function loadServices(_callback)
{
    fetch(link + "service")
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
            services[i] = element;
            i++;
        });
        cats = services.filter(x => x.animal_type.type === 'Cat');
        dogs = services.filter(x => x.animal_type.type === 'Dog');
        loadServiceProviders(_callback);
    });
}

function capitalize(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function loadServiceProviders(_callback)
{
    fetch(link + "service_provider")
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
            serviceProviders[i] = element;
            i++;
        });
        loadReviews(_callback)
    });
}

function loadReviews(_callback)
{
    
    fetch(link + "Review")
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
            reviews[i] = element;
            i++;
        });
        createDic(_callback);
    });
}

//he he ha ha funny name
function createDic(_callback)
{
    serviceProviders.forEach(p => {
        serviceUserDic[p.user_id] = [];
        userReviewDic[p.id] = [];
        serviceProviderDic[p.user_id] = p;
    })

    services.forEach(s => {
        let arr = serviceUserDic[s.user_id];
        arr[arr.length] = s;
        serviceUserDic[s.user_id] = arr;
    })
    reviews.forEach(r => {
        let arr = userReviewDic[r.service_provider_id];
        arr[arr.length] = r;
        userReviewDic[r.service_provider_id] = arr;
    })

    updateServices(_callback);
    // {
    //     "id": 1,
    //     "customer_id": 1,
    //     "service_provider_id": 1,
    //     "review": "Great!",
    //     "rating": 4.2,
    //     "customer": {
    //       "id": 1,
    //       "user_id": 1,
    //       "user": {
    //         "id": 1,
    //         "user_name": "jd99",
    //         "first_name": "john",
    //         "last_name": "doe",
    //         "age": 25,
    //         "profile_picture": "null",
    //         "user_type_id": 1,
    //         "user_type": {
    //           "id": 1,
    //           "type": "customer"
    //         }
    //       }
    //     }

}

function setPrice(node, service, name)
{
    let text = capitalize(name) + '<p style=\"font-size: small; font-weight: 400; margin: 0;\">' + " $" + service.price + " / " + service.time_measurement.type + "</p>";
    node.innerHTML = text;
}

function setStars(rating, stars)
{
            
    let rating_floor = Math.floor(rating);
    for(j = 0; j < rating_floor; j++)
    {
        stars[j].setAttribute("src", "images/star.png");
    }

    if(rating == 5)
        return;
    
    if((rating - rating_floor) >= .5)
        stars[rating_floor].setAttribute("src", "images/star-half.png");
    else
    {
        stars[rating_floor].setAttribute("src", "images/star-empty.png");

    }

    for(j = rating_floor + 1; j < 5; j++)
    {
        stars[j].setAttribute("src", "images/star-empty.png");
    }
}

function updateServices(_callback)
{
    
    let template = document.getElementById("serviceTemplate");
    let review_template = document.getElementById("review-template")
    let content = template.content;
    let review_content = review_template.content;

    length = Object.keys(serviceUserDic).length;
    //sort by highest reviews first
    
    let sorted_users = Object.values(serviceProviderDic);
    sorted_users = sorted_users.sort((a, b) => {
        return a.rating > b.rating ? -1 : 1;
    })


    for(i = 0; i < length; i++)
    {
        let user_services = Object.values(serviceUserDic)[sorted_users[i].user_id - 1];


        let clone = content.cloneNode(true);
        let r_clone = review_content.cloneNode(true);
        
        let service = user_services[0];
        let service_provider = serviceProviderDic[service.user_id];
        
        r = getBestReview(service_provider);
        clone.getElementById("service id").setAttribute("id", "service " + i);

        document.getElementById("scroller").appendChild(clone);
        clone = document.getElementById("service " + i);
        if(r)
            clone.querySelector("#"+"cat-dog-review-section").appendChild(r_clone);

        r_clone = clone.querySelector("#"+"review");

        let s_name = clone.querySelector("#" + "service-full-name");
        let s_u_name = clone.querySelector("#" + "service-user-name")
        let s_rating = clone.querySelector("#" + "service-rating");
        let s_star1 = clone.querySelector("#" + "service-star-1");
        let s_star2 = clone.querySelector("#" + "service-star-2");
        let s_star3 = clone.querySelector("#" + "service-star-3");
        let s_star4 = clone.querySelector("#" + "service-star-4");
        let s_star5 = clone.querySelector("#" + "service-star-5");
        // clone.querySelector("#" + )
        let s_cat = clone.querySelector("#" + "service-cats-bubble");
        let s_dog = clone.querySelector("#" + "service-dogs-bubble");
        let s_grooming = clone.querySelector("#" + "service-grooming-bubble");
        let s_walking = clone.querySelector("#" + "service-walking-bubble");
        let s_sitting = clone.querySelector("#" + "service-sitting-bubble");
        
        
        clone.setAttribute("onClick", "showServiceProfile(" + service.user_id + ")")

        fname = capitalize(service.user.first_name);
        fname += " " + capitalize(service.user.last_name);
        s_name.innerText = fname;

        s_u_name.innerText = "@" + service.user.user_name.toLowerCase();


        if(r)
        {
            s_rating.innerText = service_provider.rating;

            let stars = [s_star1, s_star2, s_star3, s_star4, s_star5];

            setStars(service_provider.rating, stars)
        }
        else
        {
            s_rating.innerText = "No Reviews Yet";
            s_star1.style.display = 'none';
            s_star2.style.display = 'none';
            s_star3.style.display = 'none';
            s_star4.style.display = 'none';
            s_star5.style.display = 'none';
        }


        done = {"walking" : false, "grooming": false, "sitting": false};
        user_services.forEach(service => {
            switch(service.animal_type.type.toLowerCase())
            {
                case "dog":
                    s_dog.style.display = '';
                    break;

                case "cat":
                    s_cat.style.display = '';
                    break;
            }

            switch(service.service_type.type.toLowerCase())
            {
                case "walking":
                    s_walking.removeAttribute("style");
                    setPrice(s_walking, service, "walking");
                    break;
                case "grooming":
                    s_grooming.removeAttribute("style");
                    setPrice(s_grooming, service, "grooming");
                    break;
                case "sitting":
                    s_sitting.removeAttribute("style");
                    setPrice(s_sitting, service, "sitting");
                    break;
            }
        })



        if(r)
            setReview(r_clone, r);
        // { SERVICE JSON
        //     "id": 1,
        //     "price": 24.99,
        //     "user_id": 2,
        //     "service_type_id": 1,
        //     "animal_type_id": 1,
        //     "time_measurement_id": 1,
        //     "user": {
        //         "id": 2,
        //         "user_name": "js24",
        //         "first_name": "jane",
        //         "last_name": "smith",
        //         "age": 22,
        //         "profile_picture": "null",
        //         "user_type_id": 2,
        //         "user_type": {
        //             "id": 2,
        //             "type": "service_provider"
        //         }
        //     },
        //     "service_type": {
        //         "id": 1,
        //         "type": "Walking"
        //     },
        //     "animal_type": {
        //         "id": 1,
        //         "type": "Dog"
        //     },
        //     "time_measurement": {
        //         "id": 1,
        //         "type": "Day"
        //     }
        // }

    }
    _callback();
}

function getBestReview(service_provider)
{

    let reviews = userReviewDic[service_provider.id];
    let review = reviews[0];
    reviews.forEach(r => {
        if(review.rating < r.rating)
            review = r;
    })

    return review;
}

function setReview(r_clone, review)
{
            
    // { REVIEW JSON
    //     "id": 1,
    //     "customer_id": 1,
    //     "service_provider_id": 1,
    //     "review": "Great!",
    //     "rating": 4.2,
    //     "customer": {
    //       "id": 1,
    //       "user_id": 1,
    //       "user": {
    //         "id": 1,
    //         "user_name": "jd99",
    //         "first_name": "john",
    //         "last_name": "doe",
    //         "age": 25,
    //         "profile_picture": "null",
    //         "user_type_id": 1,
    //         "user_type": {
    //           "id": 1,
    //           "type": "customer"
    //         }
    //       }
    //     }
    
    

    let r_user = review.customer.user;

    let r_name = r_clone.querySelector("#" + "review-full-name");
    let r_u_name = r_clone.querySelector("#" + "review-user-name")
    let r_rating = r_clone.querySelector("#" + "review-rating");
    let r_star1 = r_clone.querySelector("#" + "review-star-1-small");
    let r_star2 = r_clone.querySelector("#" + "review-star-2-small");
    let r_star3 = r_clone.querySelector("#" + "review-star-3-small");
    let r_star4 = r_clone.querySelector("#" + "review-star-4-small");
    let r_star5 = r_clone.querySelector("#" + "review-star-5-small");
    let r_desc = r_clone.querySelector("#"+"review-text");

    
    r_name.innerText = capitalize(r_user.first_name) + " " + capitalize(r_user.last_name);
    r_u_name.innerText = "@" + r_user.user_name.toLowerCase();
    r_rating.innerText = review.rating;


    stars = [r_star1, r_star2, r_star3, r_star4, r_star5];
    setStars(review.rating, stars);

    r_desc.innerHTML = "<p>" + review.review + "</p>"
}

function populateServices(services)
{
    let scroller = document.getElementById("scroller");
    for(i = 0; i < services.length; i++) {

        let service = services[i];

        let item = document.createElement('div');
        item.setAttribute("class", "scroller-child");
        
        let name = document.createElement('div');
        name.setAttribute("class", "scroller-name");
        name.setAttribute("innerHTML", service.first_name + " " + service.last_name);

        let rate = document.createElement('div');
        name.setAttribute("class", "scroller-rate");

        let pfp = document.createElement('img');
        pfp.setAttribute("class", "scroller-pfp")

        let type = document.createElement('div');
        type.setAttribute("class", "scroller-type");

        item.append(pfp);
        item.append(name);
        item.append(type);
        item.append(rate);
        
        scroller.append(item);

    }
}
