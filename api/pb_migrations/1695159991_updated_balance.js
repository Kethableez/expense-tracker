/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b22ig0l7dr2x26i")

  collection.options = {
    "query": "SELECT \n  accounts.id, \n  SUM(income.amount) as income,\n  SUM(outcome.amount) as outcome\nFROM accounts \n  LEFT JOIN income on income.account = accounts.id\n  LEFT JOIN outcome on outcome.account = accounts.id\nGROUP BY accounts.id"
  }

  // remove
  collection.schema.removeField("drzmpr31")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7jd8mlvs",
    "name": "income",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jrp8lbtf",
    "name": "outcome",
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
    "query": "SELECT \n  accounts.id, \n  SUM(expenses.amount) as amount\nFROM accounts \n  LEFT JOIN expenses on expenses.account = accounts.id\n  GROUP BY accounts.id"
  }

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

  // remove
  collection.schema.removeField("7jd8mlvs")

  // remove
  collection.schema.removeField("jrp8lbtf")

  return dao.saveCollection(collection)
})
