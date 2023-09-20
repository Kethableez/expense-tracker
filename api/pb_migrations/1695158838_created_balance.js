/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "b22ig0l7dr2x26i",
    "created": "2023-09-19 21:27:18.900Z",
    "updated": "2023-09-19 21:27:18.900Z",
    "name": "balance",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qonw2dyc",
        "name": "amount",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT accounts.id, amount FROM accounts RIGHT JOIN expenses on accounts.id = expenses.account"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b22ig0l7dr2x26i");

  return dao.deleteCollection(collection);
})
