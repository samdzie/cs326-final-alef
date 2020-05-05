import { Restroom } from './classes/restroom';
import { Database } from './mongo-database';

let express = require('express');

const MIN_ID = 100000000;
const MAX_ID = 999999999;
const USED_ID_KEY = "usedIDs";

export class MyServer {

	private database;
	private metadata;
    private server = express();
	private router = express.Router();

    constructor(db) {
		this.database = db;
		this.metadata = new Database("metadata");

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
		this.server.use('/search', express.static('./static/restroom.html'));  //need to work on this

		// handle POST in JSON format
		this.server.use(express.json());

		// Set a single handler for a route.
		this.router.post('/create', this.createHandler.bind(this));
		// Set multiple handlers for a route, in sequence.
		this.router.post('/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
		this.router.post('/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
		this.router.post('/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
		this.router.post('/search', [this.errorHandler.bind(this), this.searchHandler.bind(this)]);
		//this.router.post('/getall', [this.errorHandler.bind(this), this.getAllHandler.bind(this)]);

		// Set a fall-through handler if nothing matches.
		this.router.post('*', async (request, response) => {
			response.send(JSON.stringify({ "result" : "command-not-found" }));
		});
		// Start up the restroom endpoint at '/restroom'.
		this.server.use('/restroom', this.router);

    }

    public listen(port) : void  {
		this.server.listen(port);
	}

    private async errorHandler(request, response, next) : Promise<void> {
		console.log("tried so hard");
		let value = true;
		if (!value) {
			response.write(JSON.stringify({'result' : 'error'}));
			response.end();
		} else {
			next();
		}
    }
    
    private async createHandler(request, response) : Promise<void> {
		await this.createRestroom(response);
    }

    private async readHandler(request, response): Promise<void> {
		await this.readRestroom(request.body.id, response);
    }

    private async updateHandler(request, response) : Promise<void> {
		await this.updateRestroom(request.body.id, request.body.restroom, response);
    }

    private async deleteHandler(request, response) : Promise<void> {
		await this.deleteRestroom(request.body.id, response);
	}
	
    private async searchHandler(request, response): Promise<void> {
		console.log("got so far");
		await this.searchRestrooms(request.body.id, response);
	}
	
	private async getAllHandler(request, response): Promise<void> {
		await this.getAllRestrooms(response);
	}
	
	public async createRestroom(response) : Promise<void> {
		console.log(`received create request`);
		let newID = await this.generateNewID();
		await this.database.put(newID, new Restroom(newID));
		response.write(JSON.stringify({
			"result" : "created",
			"id" : newID
		}));
		response.end();
	}

	public async readRestroom(id: number, response) : Promise<void> {
		console.log(`received read request for restroom ${id}`);
		let restroom = await this.database.get(id);
		response.write(JSON.stringify({
			"result" : "read",
			"id" : id,
			"restroom" : JSON.stringify(restroom)
		}));
		response.end();
	}

	public async updateRestroom(id: number, restroom: Restroom, response) {
		console.log(`received update request for restroom ${id}`);
		await this.database.put(id, restroom);
		response.write(JSON.stringify({
			"result" : "updated",
			"id" : id
		}));
		response.end();
	}

	public async deleteRestroom(id: number, response) {
		console.log(`received delete request for restroom ${id}`);
		await this.database.del(id);
		let usedIDs = await this.metadata.get(USED_ID_KEY);
		if (!usedIDs) {
			usedIDs = [];
		}
		usedIDs.splice(usedIDs.indexOf(id), 1);
		await this.metadata.put(USED_ID_KEY, usedIDs);
		response.write(JSON.stringify({
			"result" : "deleted",
			"id" : id
		}));
		response.end();
	}

	public async searchRestrooms(id: number, response) : Promise<void> {
		console.log(`received read request for restroom ${id}`);
		let restroom = new Restroom(id);
		response.write(JSON.stringify({
			"result" : "found", //when implemented this would return multiple objects
			"id" : id,
			"restroom" : JSON.stringify(restroom)
		}));
		response.end();
	}

	public async getAllRestrooms(response): Promise<void> {
		console.log("received request for all restrooms...");
		let usedIDs = await this.metadata.get(USED_ID_KEY);
		if (!usedIDs) {
			usedIDs = [];
		}
		response.write(JSON.stringify({
			"result" : "fetched all",
			"list" : usedIDs
		}));
		response.end();
	}

	private async generateNewID(): Promise<number> {
		let usedIDs = await this.metadata.get(USED_ID_KEY);
		if (!usedIDs) {
			usedIDs = [];
		}
		if (usedIDs.length >= MAX_ID - MIN_ID + 1) {
			throw new Error("reached maximum number of unique IDs");
		}
		let result: number;
		do {
			result = Math.floor(Math.random() * Math.floor(MAX_ID - MIN_ID + 1)) + MIN_ID;
		} while (usedIDs.indexOf(result) !== -1)
		usedIDs.push(result);
		await this.metadata.put(USED_ID_KEY, usedIDs);
		return result;
	}
}

