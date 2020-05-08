# Team Alef

## UMass Restroom Tracker
### Spring 2020

## Overview 
Our application is a database of bathrooms on the UMass campus, and an interface for users to rate and comment about them, similar to Yelp or IMDB. It allows people to see where the nearest bathroom is and users are able to filter through bathroom requirements (such as having a changing table, being accessible to them, female product disposal, and so on). Ratings would be averaged and displayed.

## Team Members
* Sam Dziewietin (@samdzie)
* Ankita Kumar (@Ankita-Kumar)
* Raymond Tan (@raymond98tan)

## User Interface
### Home
![home page ui](ui/homepage.png)
From this page, users may filter restrooms by building, gender, accessible entrance, nearby lactation room, changing table, extra large stalls, paper towels, seat covers, sanitary products, and a lock.
### Add Restroom
![restroom rate and comment](ui/add_bathroom.png)
This page comes up when the user clicks the "Create New" button on the home page. From this page, users are able to input their own bathroom into the database, providing the name, description, rating, features, as well as the first comment.
### Restroom view
![restroom view ui](ui/search_results.png)
This page comes up when users click "Search" from the home page and it displays the results of filtering.
### Rating submission page
![rating submission ui](ui/restroom_rate.png)
This page comes up when users click the "Rate this restroom" button. From here, users are able to give a rating for the bathroom and leave their comments on it.

## APIs
API documentation is available [here](https://docs.google.com/document/d/1c31cUi0dC66n8w7lVmq3Tw-KCG-3hsgRvamOfF9ZKB4/edit?usp=sharing).

## Database
A final up-to-date representation of your database including a brief description of each of the entities in your data model and their relationships if any.

## URL Routes/Mappings
A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.

## Division of Labor
We divided both frontend and backend implementations based on functions. Sam implemented the creation and updating of the restroom database, Ankita worked on the searching feature, and Raymond worked on the login and google maps APIs. Overall, the contributions were :
* Sam - index.html and its wireframe, restroom.html and its wireframe, style.css, the repo's file structure, restroom CRUD, backend skeleton, MongoDB configuration, back-end CRUD for restroom entries
* Ankita - login.html and its wireframe, update.html and its wireframe, style.css, search client and server
* Raymond - part of index.html, wireframes, found and added icons for the features, login client, Google map API

## Conclusion
Working on this project, we learned the importance of designing and creating wireframes to visualize our endgoal before writing any code. We learned about the many important parts in putting a website together which include html, css, bootstrapping, typscript, databases, servers, ports, heroku, etc. A difficulty we encountered with the project was trying to figure out how to connect the database searching function to the server-client implementation. Another difficulty we had was with connecting the query with the string of the actual bathroom location for the google maps api. Our team also struggled in figuring out how to connect our client to heroku.

A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.