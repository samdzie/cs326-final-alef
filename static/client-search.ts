import { Features, Restroom } from '../classes/restroom';
import { Comment, CommentSection } from '../classes/comments';
import { User } from '../classes/user';

// const url: string = "http://127.0.0.1:8080";
// const url: string = "boiling-lake-26129.herokuapp.com";
const url: string = "localhost:8080"; //process.env.URL ||
const postURL: string = url;
const fullstar: string = "&#9733;";
const blankstar: string = "&#9734;";

let target: Restroom; //this object will store all the features desired/ defined by the user 
let rating: number = 0;
let cleanliness: number = 0;
let traffic: number = 0;

/**  not sure what the below function does??
(async () => {
    // send POST request
    const data = {};
    const newURL = postURL + "/getall";
    console.log(`getall: fetching ${newURL}`);
    const response = await(postData(newURL, data));
    const j = await response.json();
    console.log(j);
    if (j.list) {
        let list = j.list;
        for (let i = 0; i < list.length; i++) {
            let id = list[i];
            let results = document.getElementById("results");
            if (results) {
                let p = document.createElement("p");
                let a = document.createElement("a");
                a.setAttribute("href", "/restroom?id="+id);
                let idText = document.createTextNode(id);
                a.appendChild(idText);
                p.appendChild(a);
                results.appendChild(p);
            }
        }
    }
})();
*/

console.log("started client-search");

// helper function from lecture 21 exercise
async function postData(url: string, data: Object) {
    const resp = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    });
    return resp;
}



export function search() {
    (async () => {

        //read things from the html
        let buildingElement = document.getElementById("building") as HTMLInputElement;
        let genderElement = document.getElementById("gender") as HTMLInputElement;
        let accessibleElement = document.getElementById("accessible") as HTMLInputElement;
        let lactationElement = document.getElementById("lactation") as HTMLInputElement;
        let changingElement = document.getElementById("changing") as HTMLInputElement;
        let stallElement = document.getElementById("stall") as HTMLInputElement; 
        let towelsElement = document.getElementById("towels") as HTMLInputElement;
        let coversElement = document.getElementById("covers") as HTMLInputElement;
        let sanitaryElement = document.getElementById("sanitary") as HTMLInputElement;
        let lockElement = document.getElementById("lock") as HTMLInputElement;

        //target is initalized as a restroom object with dummy ID 123
        /*if an element of target is not set to its default, then the server
        will use it as one of the search params**/
        target = new Restroom(123); 
        
        if(buildingElement){
            target.building = buildingElement.value;
        }
        if(genderElement){
            target.features.gender = genderElement.value;
        }
        if(accessibleElement){
            target.features.accessible = accessibleElement.checked;
        }
        if(lactationElement){
            target.features.lactation = lactationElement.checked;
        }
        if(changingElement){
            target.features.changing = changingElement.checked;
        }
        if(stallElement){
            target.features.stall = stallElement.checked;
        }
        if(towelsElement){
            target.features.towels = towelsElement.checked;
        }
        if(coversElement){
            target.features.covers = coversElement.checked;
        }
        if(sanitaryElement){
            target.features.sanitary = sanitaryElement.checked;
        }
        if(lockElement){
            target.features.lock = lockElement.checked;
        }
        console.log("got here");

        // construct Restroom object to POST
        target.name = "";
        target.description = "";

        // send POST request
        const data = {
            "restroom" : target
        };
        const newURL = postURL + "/search";
        console.log(`searching: fetching ${newURL}`);
        const response = await(postData(newURL, data));
        const j = await response.json();
        console.log(j);
        let restrooms = JSON.parse(j.restroom);

        let resultElement = document.getElementById("results") as HTMLOutputElement;

        // to escape characters : 
        //" becomes &quot;
        //' becomes &#39;
        for( let i = 0; i< restrooms.length; i++){
            console.log('<div class="row"><div class="col-md-5 col-sm-12" class="result-container-image"><img src="' + restrooms[i].image + '" class="img-fluid"/></div><div class="col-md-7 col-sm-12" class="result-container-text"><h3><a href="http://127.0.0.1:8080/restroom?id=' + restrooms[i].id + '">' + restrooms[i].name + '</a></h3><p>' + restrooms[i].description + '</p></div></div><br/>');
            resultElement.insertAdjacentHTML("beforeend",'<div class="row"><div class="col-md-5 col-sm-12" class="result-container-image"><img src="' + restrooms[i].image + '" class="img-fluid"/></div><div class="col-md-7 col-sm-12" class="result-container-text"><h3><a href="http://127.0.0.1:8080/restroom?id=' + restrooms[i].id + '">' + restrooms[i].name + '</a></h3><p>' + restrooms[i].description + '</p></div></div><br/>');
        }


    })();
}


