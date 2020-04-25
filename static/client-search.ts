import { Restroom } from '../classes/restroom';

const url: string = "http://localhost:8080";

let target: Restroom;
//from in class exercise
async function postData(url: string, data: Object) {
    const resp = await fetch(url,
         {
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
        const data = {
            "restroom" : target
        };
        const newURL = url + "/search";
        console.log(`restroomUpdate: fetching ${newURL}`);
        const response = await(postData(newURL, data));
        const j = await response.json();
        console.log(j);
    



        //get results from the backend
        //post them to the html
        //using a lot of html.innerelement and outerelement baiscally
        //linking to index.html
    
    })();
}
