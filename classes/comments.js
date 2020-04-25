"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A data structure for user comments.
 */
class Comment {
    constructor(author) {
        this.author = author;
        this.content = "";
        this.time = new Date().getTime();
        this.rating = 0;
        this.traffic = 0;
        this.cleanliness = 0;
    }
}
exports.Comment = Comment;
/**
 * A wrapper class for a list of comments.
 */
class CommentSection {
    constructor() {
        this.list = [];
    }
    /**
     * Adds a given comment to the list.
     * @param comment Comment to be added
     */
    add(comment) {
        this.list.push(comment);
        this.calculateAverageRating;
        this.calculateAverageCleanliness;
        this.calculateAverageTraffic;
    }
    /**
     * Removes a given comment from the list.
     * @param comment Comment to be removed
     */
    remove(comment) {
        let idx = this.list.indexOf(comment);
        if (idx === -1) {
            throw new Error("comment not found");
        }
        this.list.splice(idx, 1);
    }
    /**
     * Returns a deep copy of comment list.
     */
    comments() {
        return this.list.slice();
    }
    /**
     * Returns average overall rating across comments.
     */
    calculateAverageRating() {
        this.averageRating = this.average(x => x.rating);
    }
    /**
     * Returns average cleanliness rating across comments.
     */
    calculateAverageCleanliness() {
        this.averageCleanliness = this.average(x => x.cleanliness);
    }
    /**
     * Returns average traffic rating across comments.
     */
    calculateAverageTraffic() {
        this.averageTraffic = this.average(x => x.traffic);
    }
    /**
     * Finds average across comment list for a given metric (rating, cleanliness, traffic).
     * @param callback Function to extract appropriate rating from comment
     */
    average(callback) {
        let ratings = this.list.map(callback);
        let sum = ratings.reduce(function (total, next) {
            return total + next;
        });
        return sum / ratings.length;
    }
}
exports.CommentSection = CommentSection;
