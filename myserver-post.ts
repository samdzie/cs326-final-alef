import { Restroom } from './classes/restroom';
import { User } from './classes/user';
import { Comment } from './classes/comments';

let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
	private router = express.Router();
	private restroom: Restroom;

    // constructor(db) {
	// this.theDatabase = db;
	constructor() {
		this.restroom = new Restroom(1234567890);
		this.restroom.name = "ILC 123";
		this.restroom.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum, tortor posuere fermentum lacinia, justo odio mattis lacus, a suscipit lacus elit a mi. Nulla facilisi. Quisque ac risus ut ipsum pulvinar gravida quis non diam. Sed cursus purus id blandit suscipit. Nunc ac gravida justo. Sed metus velit, congue non arcu sit amet, bibendum laoreet velit. Nunc feugiat sapien eu nisi volutpat lobortis non sit amet tortor. Ut ullamcorper egestas justo et interdum. Nulla eget venenatis mauris. Donec auctor tristique erat.";
		this.restroom.features.gender = "Women";
		this.restroom.features.accessible = true;
		this.restroom.features.changing = true;
		this.restroom.features.covers = true;
		this.restroom.features.lactation = true;
		this.restroom.features.lock = true;
		this.restroom.features.sanitary = true;
		this.restroom.features.stall = true;
		this.restroom.features.towels = true;
		let newUser1 = new User("someuser1");
		let newComment1 = new Comment(newUser1);
		newComment1.rating = 4;
		newComment1.cleanliness = 5;
		newComment1.traffic = 3;
		newComment1.content = "Pretty good.";
		let newUser2 = new User("someuser2");
		let newComment2 = new Comment(newUser2);
		newComment2.rating = 3;
		newComment2.cleanliness = 4;
		newComment2.traffic = 4;
		newComment2.content = "Not bad.";
		this.restroom.comments.add(newComment1);
		this.restroom.comments.add(newComment2);

	// from https://enable-cors.org/server_expressjs.html
	this.router.use((request, response, next) => {
	    response.header('Content-Type','application/json');
	    response.header('Access-Control-Allow-Origin', '*');
	    response.header('Access-Control-Allow-Headers', '*');
	    next();
	});
	// Serve static pages from a particular path.
	this.server.use('/', express.static('./static'));
	this.server.use('/login', express.static('./static/login.html'));
	this.server.use('/restroom', express.static('./static/restroom.html'));
	this.server.use('/update', express.static('./static/update.html'));
	this.server.use('/search', express.static('./static/index.html'));

	// NEW: handle POST in JSON format
	this.server.use(express.json());
	// Set a single handler for a route.
	this.router.post('/create', this.createHandler.bind(this));

	// Set multiple handlers for a route, in sequence.
	this.router.post('/read',   [this.errorHandler.bind(this), this.readHandler.bind(this) ]);
	this.router.post('/update',   [this.errorHandler.bind(this), this.updateHandler.bind(this) ]);
	this.router.post('/delete',   [this.errorHandler.bind(this), this.deleteHandler.bind(this) ]);
	this.router.post('/search',   [this.errorHandler.bind(this), this.searchHandler.bind(this) ]);

	// Set a fall-through handler if nothing matches.
	this.router.post('*', async (request, response) => {
	    response.send(JSON.stringify({ "result" : "command-not-found" }));
	});
	// Start up the counter endpoint at '/counter'.
	this.server.use('/restroom', this.router);
    }

    private async errorHandler(request, response, next) : Promise<void> {
		let value = true;
	// let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.body.name);
//	console.log("result from database.isFound: " + JSON.stringify(value));
	if (!value) {
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
    }
    
    private async createHandler(request, response) : Promise<void> {
		await this.createRestroom(response);
	// await this.createCounter(request.params['userId']+"-"+request.body.name, response);
    }

    private async readHandler(request, response): Promise<void> {
		await this.readRestroom(request.body.id, response);
	// console.log(request.params['userId']);
	// await this.readCounter(request.params['userId']+"-"+request.body.name, response);
    }

    private async updateHandler(request, response) : Promise<void> {
		await this.updateRestroom(request.body.id, response);
	// await this.updateCounter(request.params['userId']+"-"+request.body.name, request.body.value, response);
    }

    private async deleteHandler(request, response) : Promise<void> {
		await this.deleteRestroom(request.body.id, response);
	// await this.deleteCounter(request.params['userId']+"-"+request.body.name, response);
	}
	
    private async searchHandler(request, response): Promise<void> {
		await this.searchRestrooms(request.body.id, response);
    }

    public listen(port) : void  {
	this.server.listen(port);
	}
	
	public async createRestroom(response) : Promise<void> {
		console.log(`received create request`);
		response.write(JSON.stringify({
			"result" : "created",
			"id" : this.restroom.id
		}));
		response.end();
	}

	public async readRestroom(id: number, response) : Promise<void> {
		console.log(`received read request for restroom ${id}`);
		response.write(JSON.stringify({
			"result" : "read",
			"id" : this.restroom.id,
			"restroom" : JSON.stringify(this.restroom)
		}));
		response.end();
	}

	public async updateRestroom(id: number, response) {
		console.log(`received update request for restroom ${id}`);
		response.write(JSON.stringify({
			"result" : "updated",
			"id" : this.restroom.id
		}));
		response.end();
	}

	public async deleteRestroom(id: number, response) {
		console.log(`received delete request for restroom ${id}`);
		response.write(JSON.stringify({
			"result" : "deleted",
			"id" : this.restroom.id
		}));
		response.end();
	}

	public async searchRestrooms(id: number, response) : Promise<void> {
		console.log(`received read request for restroom ${id}`);
		response.write(JSON.stringify({
			"result" : "found", //when implemented this would return multiple objects
			"id" : this.restroom.id,
			"restroom" : JSON.stringify(this.restroom)
		}));
		response.end();
	}
}

