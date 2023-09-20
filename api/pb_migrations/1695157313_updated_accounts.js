/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("htsqtflx9n36i00")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mttdlrt0",
    "name": "currency",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "PLN",
        "EUR",
        "USD"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("htsqtflx9n36i00")

  // remove
  collection.schema.removeField("mttdlrt0")

  return dao.saveCollection(collection)
})
