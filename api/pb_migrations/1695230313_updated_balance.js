/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b22ig0l7dr2x26i")

  collection.options = {
    "query": "SELECT \n    accounts.id AS id,\n    SUM(CASE WHEN E.type = 'INCOME' THEN E.amount ELSE 0 END) AS TotalIncome,\n    SUM(CASE WHEN E.type = 'OUTCOME' THEN E.amount ELSE 0 END) AS TotalOutcome\nFROM \n    accounts\nLEFT JOIN \n    expenses E ON accounts.id = E.account\nGROUP BY \n    accounts.id;"
  }

  // remove
  collection.schema.removeField("7sywwpbd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lxkzpq3a",
    "name": "TotalIncome",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6pnrsnit",
    "name": "TotalOutcome",
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
    "query": "SELECT \n  accounts.id, \n  SUM(expenses.amount) as income\nFROM accounts\nRIGHT JOIN expenses on accounts.id = expenses.account"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7sywwpbd",
    "name": "income",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("lxkzpq3a")

  // remove
  collection.schema.removeField("6pnrsnit")

  return dao.saveCollection(collection)
})
