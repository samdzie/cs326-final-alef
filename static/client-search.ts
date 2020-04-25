import { Features, Restroom } from '../classes/restroom';
import { Comment, CommentSection } from '../classes/comments';
import { User } from '../classes/user';

// const url: string = "http://127.0.0.1:8080";
const url: string = "boiling-lake-26129.herokuapp.com";
const postURL: string = url + "/home";
const fullstar: string = "&#9733;";
const blankstar: string = "&#9734;";

let target: Restroom;
let rating: number = 0;
let cleanliness: number = 0;
let traffic: number = 0;


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

        //pass them to the backend

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

        for( let i = 0; i< restrooms.length; i++){
            resultElement.insertAdjacentHTML("beforeend",'<div class="row"><div class="col-md-5 col-sm-12" class="result-container-image"><img src="' + restrooms[i].image + '" class="img-fluid"/></div><div class="col-md-7 col-sm-12" class="result-container-text"><h3><a href="http://127.0.0.1:8080/restroom?id='+restrooms[i].id+'">' + restrooms[i].name + '</a></h3><p>' + restrooms[i].description + '</p></div></div><br/>');
        }





    })();
}



        //get results from the backend
        //post them to the html
        //using a lot of html.innerelement and outerelement baiscally
        //linking to index.html
 
