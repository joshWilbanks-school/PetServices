

const services = [];
let cats = [];
let dogs = [];

document.addEventListener("DOMContentLoaded", () => {
    let template = document.getElementById("serviceTemplate");
    let review_template = document.getElementById("review-template")
    let content = template.content;
    let review_content = review_template.content;

    for(i = 0; i < 10; i++)
    {

        let clone = content.cloneNode(true);
        let r_clone = review_content.cloneNode(true);
        clone.getElementById("service id").setAttribute("id", "service " + i);

        document.getElementById("scroller").appendChild(clone);
        clone = document.getElementById("service " + i);
        clone.querySelector("#"+"cat-dog-review-section").appendChild(r_clone);
        
    }

})
document.documentElement.className = 'reflow_' + (new Date()).getTime();
function loadServices()
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
            console.log(services[i]);
            i++;
        });
        cats = services.filter(x => x.animal_type.type === 'Cat');
        dogs = services.filter(x => x.animal_type.type === 'Dog');
        console.log(cats);
        console.log(dogs);
    });
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