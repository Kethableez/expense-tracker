/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aie4k0dalkhn210")

  // remove
  collection.schema.removeField("9smp8sqw")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aie4k0dalkhn210")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9smp8sqw",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "INCOME",
        "OUTCOME"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
