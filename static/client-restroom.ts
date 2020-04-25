import { Features, Restroom } from '../classes/restroom';
import { Comment, CommentSection } from '../classes/comments';
import { User } from '../classes/user';

const url: string = "http://127.0.0.1:8080";
const postURL: string = url + "/restroom";
const fullstar: string = "&#9733;";
const blankstar: string = "&#9734;";

let restroom: Restroom;
let rating: number = 0;
let cleanliness: number = 0;
let traffic: number = 0;

// get restroom ID from URL
// based on https://easyautotagging.com/javascript-get-url-parameter/
const query = window.location.search;
const parameters = new URLSearchParams(query);
let idParam = parameters.get("id");
let id: number = 0;
if (idParam) { id = parseInt(idParam); }
restroomRead();

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

export function restroomCreate() {
    (async () => {
        // send POST request
        const data = {};
        const newURL = postURL + "/create";
        console.log(`restroomUpdate: fetching ${newURL}`);
        const response = await(postData(newURL, data));
        const j = await response.json();
        console.log(j);
    })();
}

export function restroomRead() {
    (async () => {
        // send POST request
        const data = {
            "id" : id
        };
        const newURL = postURL + "/read";
        console.log(`restroomUpdate: fetching ${newURL}`);
        const response = await(postData(newURL, data));
        const j = await response.json();
        restroom = JSON.parse(j.restroom);

        let page: string = window.location.pathname;
        let nameElement = document.getElementById("name") as HTMLOutputElement;
        let descElement = document.getElementById("desc") as HTMLOutputElement;
        let genderElement = document.getElementById("gender") as HTMLSelectElement;
        let accessibleElement = document.getElementById("accessible") as HTMLInputElement;
        let stallElement = document.getElementById("stall") as HTMLInputElement;
        let sanitaryElement = document.getElementById("sanitary") as HTMLInputElement;
        let lactationElement = document.getElementById("lactation") as HTMLInputElement;
        let towelsElement = document.getElementById("towels") as HTMLInputElement;
        let lockElement = document.getElementById("lock") as HTMLInputElement;
        let changingElement = document.getElementById("changing") as HTMLInputElement;
        let coversElement = document.getElementById("covers") as HTMLInputElement;
            
        if (nameElement) { nameElement.value = restroom.name; }
        if (descElement) { descElement.value = restroom.description; }
        if (genderElement) {
            switch (restroom.features.gender) {
                case "Neutral":
                    genderElement.selectedIndex = 0;
                    break;
                case "Women":
                    genderElement.selectedIndex = 1;
                    break;
                case "Men":
                    genderElement.selectedIndex = 2;
                    break;
            }
        }
        if (accessibleElement) { accessibleElement.checked = restroom.features.accessible; }
        if (stallElement) { stallElement.checked = restroom.features.stall; }
        if (sanitaryElement) { sanitaryElement.checked = restroom.features.sanitary; }
        if (lactationElement) { lactationElement.checked = restroom.features.lactation; }
        if (towelsElement) { towelsElement.checked = restroom.features.towels; }
        if (lockElement) { lockElement.checked = restroom.features.lock; }
        if (changingElement) { changingElement.checked = restroom.features.changing; }
        if (coversElement) { coversElement.checked = restroom.features.covers; }
    })();
}

export function restroomUpdate() {
    (async () => {
        // get input DOM elements
        let nameElement = document.getElementById("name") as HTMLInputElement;
        let descElement = document.getElementById("desc") as HTMLInputElement;
        let genderElement = document.getElementById("gender") as HTMLInputElement;
        let accessibleElement = document.getElementById("accessible") as HTMLInputElement;
        let stallElement = document.getElementById("stall") as HTMLInputElement;
        let sanitaryElement = document.getElementById("sanitary") as HTMLInputElement;
        let lactationElement = document.getElementById("lactation") as HTMLInputElement;
        let towelsElement = document.getElementById("towels") as HTMLInputElement;
        let lockElement = document.getElementById("lock") as HTMLInputElement;
        let changingElement = document.getElementById("changing") as HTMLInputElement;
        let coversElement = document.getElementById("covers") as HTMLInputElement;
        let commentContentElement = document.getElementById("commentContent") as HTMLInputElement;

        // assign element values
        let name: string = "";
        let desc: string = "";
        let gender: string = "Neutral";
        let accessible: boolean = false;
        let stall: boolean = false;
        let sanitary: boolean = false;
        let lactation: boolean = false;
        let towels: boolean = false;
        let lock: boolean = false;
        let changing: boolean = false;
        let covers: boolean = false;
        let commentContent: string = "";
        if (nameElement) { name = nameElement.value; }
        if (descElement) { desc = descElement.value; }
        if (genderElement) { gender = genderElement.value; }
        if (accessibleElement) { accessible = accessibleElement.checked; }
        if (stallElement) { stall = stallElement.checked; }
        if (sanitaryElement) { sanitary = sanitaryElement.checked; }
        if (lactationElement) { lactation = lactationElement.checked; }
        if (towelsElement) { towels = towelsElement.checked; }
        if (lockElement) { lock = lockElement.checked; }
        if (changingElement) { changing = changingElement.checked; }
        if (coversElement) { covers = coversElement.checked; }
        if (commentContentElement) { commentContent = commentContentElement.value; }

        // data validation
        if (rating === 0 || cleanliness === 0 || traffic === 0) {
            alert("You must give an overall, cleanliness, and traffic rating.");
        }

        // construct Feature object
        let features = new Features();
        features.gender = gender;
        features.accessible = accessible;
        features.stall = stall;
        features.sanitary = sanitary;
        features.lactation = lactation;
        features.towels = towels;
        features.lock = lock;
        features.changing = changing;
        features.covers = covers;

        // construct CommentSection object
        let comments = new CommentSection();
        let author = new User("someuser1");
        let comment = new Comment(author);
        comment.content = commentContent;
        comment.rating = rating;
        comment.cleanliness = cleanliness;
        comment.traffic = traffic;
        comments.add(comment);

        // construct Restroom object to POST
        let restroom = new Restroom(1234567890);
        restroom.name = name;
        restroom.description = desc;
        restroom.features = features;
        restroom.comments = comments;

        // send POST request
        const data = {
            "id" : restroom.id,
            "restroom" : restroom
        };
        const newURL = postURL + "/update";
        console.log(`restroomUpdate: fetching ${newURL}`);
        const response = await(postData(newURL, data));
        const j = await response.json();
        console.log(j);
        window.location.href = url + "/restroom?id=" + id;
    })();
}

export function restroomDelete() {
    (async () => {
        // send POST request
        const data = {
            "id" : id
        };
        const newURL = postURL + "/delete";
        console.log(`restroomUpdate: fetching ${newURL}`);
        const response = await(postData(newURL, data));
        const j = await response.json();
        console.log(j);
        window.location.href = url;
    })();
}

export function setRating(x: number) {
    rating = x;
    changeStars("rating", 1, x, true);
    changeStars("rating", x+1, 5, false);
}

export function setCleanliness(x: number) {
    cleanliness = x;
    changeStars("cleanliness", 1, x, true);
    changeStars("cleanliness", x+1, 5, false);
}

export function setTraffic(x: number) {
    traffic = x;
    changeStars("traffic", 1, x, true);
    changeStars("traffic", x+1, 5, false);
}

function changeStars(type: string, from: number, to: number, filled: boolean) {
    if (from > to) {
        return;
    }
    for (let i = from; i <= to; i++) {
        let starElement = document.getElementById(type+i) as HTMLOutputElement;
        if (starElement) {
            if (filled) {
                starElement.innerHTML = fullstar;
            } else {
                starElement.innerHTML = blankstar;
            }
        }
    }
}