import { Features, Restroom } from '../classes/restroom';
import { Comment, CommentSection } from '../classes/comments';
import { User } from '../classes/user';

export function restroomCreate() {
}

export function restroomRead() {
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
        comments.add(comment);

        // construct Restroom object to POST
        let restroom = new Restroom(1234567890);
        restroom.name = name;
        restroom.description = desc;
        restroom.features = features;
        restroom.comments = comments;

        // debug
        console.log(restroom);
    })();
}

export function restroomDelete() {
}

export function rating(x: number) {
    console.log(`overall rating: ${x}`);
}

export function cleanliness(x: number) {
    console.log(`cleanliness rating: ${x}`);
}

export function traffic(x: number) {
    console.log(`traffic rating: ${x}`);
}