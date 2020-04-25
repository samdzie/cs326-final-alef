"use strict";
exports.__esModule = true;
/**
 * A data structure for user comments.
 */
var Comment = /** @class */ (function () {
    function Comment(author) {
        this.author = author;
        this.content = "";
        this.time = new Date().getTime();
        this.rating = 0;
        this.traffic = 0;
        this.cleanliness = 0;
    }
    return Comment;
}());
exports.Comment = Comment;
/**
 * A wrapper class for a list of comments.
 */
var CommentSection = /** @class */ (function () {
    function CommentSection() {
        this.list = [];
    }
    /**
     * Adds a given comment to the list.
     * @param comment Comment to be added
     */
    CommentSection.prototype.add = function (comment) {
        this.list.unshift(comment);
        this.calculateAverageRating();
        this.calculateAverageCleanliness();
        this.calculateAverageTraffic();
    };
    /**
     * Removes a given comment from the list.
     * @param comment Comment to be removed
     */
    CommentSection.prototype.remove = function (comment) {
        var idx = this.list.indexOf(comment);
        if (idx === -1) {
            throw new Error("comment not found");
        }
        this.list.splice(idx, 1);
    };
    /**
     * Returns a deep copy of comment list.
     */
    CommentSection.prototype.comments = function () {
        return this.list.slice();
    };
    /**
     * Returns average overall rating across comments.
     */
    CommentSection.prototype.calculateAverageRating = function () {
        this.averageRating = this.average(function (x) { return x.rating; });
    };
    /**
     * Returns average cleanliness rating across comments.
     */
    CommentSection.prototype.calculateAverageCleanliness = function () {
        this.averageCleanliness = this.average(function (x) { return x.cleanliness; });
    };
    /**
     * Returns average traffic rating across comments.
     */
    CommentSection.prototype.calculateAverageTraffic = function () {
        this.averageTraffic = this.average(function (x) { return x.traffic; });
    };
    /**
     * Finds average across comment list for a given metric (rating, cleanliness, traffic).
     * @param callback Function to extract appropriate rating from comment
     */
    CommentSection.prototype.average = function (callback) {
        var ratings = this.list.map(callback);
        var sum = ratings.reduce(function (total, next) {
            return total + next;
        });
        return sum / ratings.length;
    };
    return CommentSection;
}());
exports.CommentSection = CommentSection;
