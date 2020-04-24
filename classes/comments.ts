import { User } from './user';

/**
 * A data structure for user comments.
 */
export class Comment {
    private _author: User;
    private _content: string;
    private _time: number;
    private _rating: number;
    private _traffic: number;
    private _cleanliness: number;

    constructor(author: User) {
        this._author = author;
        this._content = "";
        this._time = new Date().getTime();
        this._rating = 0;
        this._traffic = 0;
        this._cleanliness = 0;
    }

    get author() {
        return this._author;
    }

    get content() {
        return this._content;
    }

    set content(content: string) {
        this._content = content;
    }

    get time() {
        return this._time;
    }

    get rating() {
        return this._rating;
    }

    set rating(rating: number) {
        if (rating >> 0 != rating || rating < 1 || rating > 5) {
            throw new Error("rating must be an integer in range 1 to 5 inclusive");
        }
        this._rating = rating;
    }

    get traffic() {
        return this._traffic;
    }

    set traffic(traffic: number) {
        if (traffic >> 0 != traffic || traffic < 1 || traffic > 5) {
            throw new Error("traffic must be an integer in range 1 to 5 inclusive");
        }
        this._traffic = traffic;
    }

    get cleanliness() {
        return this._cleanliness;
    }

    set cleanliness(cleanliness: number) {
        if (cleanliness >> 0 != cleanliness || cleanliness < 1 || cleanliness > 5) {
            throw new Error("cleanliness must be an integer in range 1 to 5 inclusive");
        }
        this._cleanliness = cleanliness;
    }
}

/**
 * A wrapper class for a list of comments.
 */
export class CommentSection {
    private _list: Array<Comment>;
    private _averageRating: number;
    private _averageCleanliness: number;
    private _averageTraffic: number;

    constructor() {
        this._list = [];
    }

    /**
     * Adds a given comment to the list.
     * @param comment Comment to be added
     */
    add(comment: Comment) {
        this._list.push(comment);
        this.calculateAverageRating;
        this.calculateAverageCleanliness;
        this.calculateAverageTraffic;
    }

    /**
     * Removes a given comment from the list.
     * @param comment Comment to be removed
     */
    remove(comment: Comment) {
        let idx = this._list.indexOf(comment);
        if (idx === -1) {
            throw new Error("comment not found");
        }
        this._list.splice(idx, 1);
    }

    /**
     * Returns a deep copy of comment list.
     */
    comments(): Array<Comment> {
        return this._list.slice();
    }

    /**
     * Returns average overall rating across comments.
     */
    private calculateAverageRating(): void {
        this._averageRating = this.average(x => x.rating);
    }

    /**
     * Returns average cleanliness rating across comments.
     */
    private calculateAverageCleanliness(): void {
        this._averageCleanliness = this.average(x => x.cleanliness);
    }

    /**
     * Returns average traffic rating across comments.
     */
    private calculateAverageTraffic(): void {
        this._averageTraffic = this.average(x => x.traffic);
    }

    /**
     * Finds average across comment list for a given metric (rating, cleanliness, traffic).
     * @param callback Function to extract appropriate rating from comment
     */
    private average(callback: (x: Comment) => number): number {
        let ratings = this._list.map(callback);
        let sum = ratings.reduce(function(total, next) {
            return total + next;
        });
        return sum / ratings.length;
    }

    get averageRating() {
        return this._averageRating;
    }

    get averageCleanliness() {
        return this._averageCleanliness;
    }

    get averageTraffic() {
        return this._averageTraffic;
    }
}