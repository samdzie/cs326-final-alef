# Database documentation
This project uses MongoDB Atlas for database hosting.

## Restroom collection
Information about each restroom is stored in a Restroom object, defined [here](/classes/restroom.ts). Each restroom is assigned a unique ID and stored as a document in this collection.

```javascript
restroom document
{
  _id: <ObjectId1>,
  name: String,         // the restroom's unique ID
  value: Restroom       // the Restroom object
}
```

## Metadata collection
This collection contains arrays of post IDs used for managing used IDs and categorizing entries. For example, the `usedIDs` array keeps track of used IDs to ensure all newly-generated IDs are unique.

```javascript
metadata document
{
  _id: <ObjectID1>,
  name: String,         // a key
  value: Array<number>  // an array of post IDs
}
```

# Division of Labor
- Ankita - search/filter functionality
- Raymond - Google map API
- Sam - MongoDB configuration, back-end CRUD for restroom entries
