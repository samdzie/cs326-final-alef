import { User } from './user';

/**
 * A data structure for user comments.
 */
export class Comment {
    author: User;
    content: string;
    time: number;
    rating: number;
    traffic: number;
    cleanliness: number;

    constructor(author: User) {
        this.author = author;
        this.content = "";
        this.time = new Date().getTime();
        this.rating = 0;
        this.traffic = 0;
        this.cleanliness = 0;
    }

    // get author() {
    //     return this._author;
    // }

    // get content() {
    //     return this._content;
    // }

    // set content(content: string) {
    //     this._content = content;
    // }

    // get time() {
    //     return this._time;
    // }

    // get rating() {
    //     return this._rating;
    // }

    // set rating(rating: number) {
    //     if (rating >> 0 != rating || rating < 1 || rating > 5) {
    //         throw new Error("rating must be an integer in range 1 to 5 inclusive");
    //     }
    //     this._rating = rating;
    // }

    // get traffic() {
    //     return this._traffic;
    // }

    // set traffic(traffic: number) {
    //     if (traffic >> 0 != traffic || traffic < 1 || traffic > 5) {
    //         throw new Error("traffic must be an integer in range 1 to 5 inclusive");
    //     }
    //     this._traffic = traffic;
    // }

    // get cleanliness() {
    //     return this._cleanliness;
    // }

    // set cleanliness(cleanliness: number) {
    //     if (cleanliness >> 0 != cleanliness || cleanliness < 1 || cleanliness > 5) {
    //         throw new Error("cleanliness must be an integer in range 1 to 5 inclusive");
    //     }
    //     this._cleanliness = cleanliness;
    // }
}

/**
 * A wrapper class for a list of comments.
 */
export class CommentSection {
    list: Array<Comment>;
    averageRating: number;
    averageCleanliness: number;
    averageTraffic: number;

    constructor() {
        this.list = [];
    }

    /**
     * Adds a given comment to the list.
     * @param comment Comment to be added
     */
    add(comment: Comment) {
        this.list.unshift(comment);
        this.calculateAverageRating();
        this.calculateAverageCleanliness();
        this.calculateAverageTraffic();
    }

    /**
     * Removes a given comment from the list.
     * @param comment Comment to be removed
     */
    remove(comment: Comment) {
        let idx = this.list.indexOf(comment);
        if (idx === -1) {
            throw new Error("comment not found");
        }
        this.list.splice(idx, 1);
    }

    /**
     * Returns a deep copy of comment list.
     */
    comments(): Array<Comment> {
        return this.list.slice();
    }

    /**
     * Returns average overall rating across comments.
     */
    calculateAverageRating(): void {
        this.averageRating = this.average(x => x.rating);
    }

    /**
     * Returns average cleanliness rating across comments.
     */
    calculateAverageCleanliness(): void {
        this.averageCleanliness = this.average(x => x.cleanliness);
    }

    /**
     * Returns average traffic rating across comments.
     */
    calculateAverageTraffic(): void {
        this.averageTraffic = this.average(x => x.traffic);
    }

    /**
     * Finds average across comment list for a given metric (rating, cleanliness, traffic).
     * @param callback Function to extract appropriate rating from comment
     */
    average(callback: (x: Comment) => number): number {
        let ratings = this.list.map(callback);
        let sum = ratings.reduce(function(total, next) {
            return total + next;
        });
        return sum / ratings.length;
    }

    // get averageRating() {
    //     return this._averageRating;
    // }

    // get averageCleanliness() {
    //     return this._averageCleanliness;
    // }

    // get averageTraffic() {
    //     return this._averageTraffic;
    // }
}