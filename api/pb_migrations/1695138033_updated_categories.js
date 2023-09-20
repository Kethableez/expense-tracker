/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ct8jp4t2jonuqt6")

  collection.listRule = "@request.auth.id = userId || forAll = true"
  collection.createRule = "@request.data.id != ''"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npvoskjc",
    "name": "userId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ct8jp4t2jonuqt6")

  collection.listRule = ""
  collection.createRule = ""

  // remove
  collection.schema.removeField("npvoskjc")

  return dao.saveCollection(collection)
})
