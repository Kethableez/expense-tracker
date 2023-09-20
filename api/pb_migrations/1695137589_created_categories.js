/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ct8jp4t2jonuqt6",
    "created": "2023-09-19 15:33:09.885Z",
    "updated": "2023-09-19 15:33:09.885Z",
    "name": "categories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "o9soqfsv",
        "name": "Name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": 16,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wdqalxz3",
        "name": "Key",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": 16,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "4vberleu",
        "name": "Icon",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "watqnsmv",
        "name": "forAll",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ct8jp4t2jonuqt6");

  return dao.deleteCollection(collection);
})
