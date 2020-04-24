"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A data structure for user comments.
 */
class Comment {
    constructor(author) {
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
    set content(content) {
        this._content = content;
    }
    get time() {
        return this._time;
    }
    get rating() {
        return this._rating;
    }
    set rating(rating) {
        if (rating >> 0 != rating || rating < 1 || rating > 5) {
            throw new Error("rating must be an integer in range 1 to 5 inclusive");
        }
        this._rating = rating;
    }
    get traffic() {
        return this._traffic;
    }
    set traffic(traffic) {
        if (traffic >> 0 != traffic || traffic < 1 || traffic > 5) {
            throw new Error("traffic must be an integer in range 1 to 5 inclusive");
        }
        this._traffic = traffic;
    }
    get cleanliness() {
        return this._cleanliness;
    }
    set cleanliness(cleanliness) {
        if (cleanliness >> 0 != cleanliness || cleanliness < 1 || cleanliness > 5) {
            throw new Error("cleanliness must be an integer in range 1 to 5 inclusive");
        }
        this._cleanliness = cleanliness;
    }
}
exports.Comment = Comment;
/**
 * A wrapper class for a list of comments.
 */
class CommentSection {
    constructor() {
        this._list = [];
    }
    /**
     * Adds a given comment to the list.
     * @param comment Comment to be added
     */
    add(comment) {
        this._list.push(comment);
    }
    /**
     * Removes a given comment from the list.
     * @param comment Comment to be removed
     */
    remove(comment) {
        let idx = this._list.indexOf(comment);
        if (idx === -1) {
            throw new Error("comment not found");
        }
        this._list.splice(idx, 1);
    }
    /**
     * Returns a deep copy of comment list.
     */
    comments() {
        return this._list.slice();
    }
    /**
     * Returns average overall rating across comments.
     */
    averageRating() {
        return this.average(x => x.rating);
    }
    /**
     * Returns average cleanliness rating across comments.
     */
    averageCleanliness() {
        return this.average(x => x.cleanliness);
    }
    /**
     * Returns average traffic rating across comments.
     */
    averageTraffic() {
        return this.average(x => x.traffic);
    }
    /**
     * Finds average across comment list for a given metric (rating, cleanliness, traffic).
     * @param callback Function to extract appropriate rating from comment
     */
    average(callback) {
        let ratings = this._list.map(callback);
        let sum = ratings.reduce(function (total, next) {
            return total + next;
        });
        return sum / ratings.length;
    }
}
exports.CommentSection = CommentSection;
