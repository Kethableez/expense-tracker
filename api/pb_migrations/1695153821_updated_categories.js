/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ct8jp4t2jonuqt6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o9soqfsv",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": 16,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wdqalxz3",
    "name": "key",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": 16,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4vberleu",
    "name": "icon",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ct8jp4t2jonuqt6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o9soqfsv",
    "name": "Name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": 16,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wdqalxz3",
    "name": "Key",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": 16,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
