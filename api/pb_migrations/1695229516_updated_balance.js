/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b22ig0l7dr2x26i")

  collection.options = {
    "query": "SELECT \n  accounts.id, \n  SUM(expenses.amount) as income\nFROM accounts\nLEFT JOIN expenses on accounts.id = expenses.account"
  }

  // remove
  collection.schema.removeField("7occqy2e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yjpue4xg",
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
    "query": "SELECT \n  accounts.id, \n  SUM(expenses.amount) as income\nFROM accounts\nLEFT JOIN expenses on accounts.id = expenses.account and expenses.type = \"INCOME\""
  }

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

  // remove
  collection.schema.removeField("yjpue4xg")

  return dao.saveCollection(collection)
})
