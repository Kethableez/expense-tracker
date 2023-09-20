/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b22ig0l7dr2x26i")

  collection.options = {
    "query": "SELECT \n  accounts.id, \n  SUM(expenses.amount) as income\nFROM accounts\nLEFT JOIN expenses on accounts.id = expenses.account and expenses.type = \"INCOME\""
  }

  // remove
  collection.schema.removeField("p0m9b7wp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7occqy2e",
    "name": "income",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b22ig0l7dr2x26i")

  collection.options = {
    "query": "SELECT \n  accounts.id, \n  SUM(expenses.amount) as income\nFROM accounts\nLEFT JOIN expenses on accounts.id = expenses.account WHERE expenses.type = \"INCOME\""
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p0m9b7wp",
    "name": "income",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("7occqy2e")

  return dao.saveCollection(collection)
})
