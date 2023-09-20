/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b22ig0l7dr2x26i")

  collection.options = {
    "query": "SELECT \n  accounts.id, \n  SUM(expenses.amount) as amount\nFROM accounts \n  LEFT JOIN expenses on expenses.account = accounts.id\n  GROUP BY accounts.id"
  }

  // remove
  collection.schema.removeField("qonw2dyc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "drzmpr31",
    "name": "amount",
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
    "query": "SELECT accounts.id, amount FROM accounts RIGHT JOIN expenses on accounts.id = expenses.account"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qonw2dyc",
    "name": "amount",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("drzmpr31")

  return dao.saveCollection(collection)
})
