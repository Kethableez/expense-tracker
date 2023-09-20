/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b22ig0l7dr2x26i")

  collection.options = {
    "query": "SELECT id, (TotalIncome - TotalOutcome) as balance FROM (\n  SELECT \n    accounts.id AS id,\n    SUM(CASE WHEN E.type = 'INCOME' THEN E.amount ELSE 0 END) AS TotalIncome,\n    SUM(CASE WHEN E.type = 'OUTCOME' THEN E.amount ELSE 0 END) AS TotalOutcome\nFROM \n    accounts\nLEFT JOIN \n    expenses E ON accounts.id = E.account\nGROUP BY \n    accounts.id\n)"
  }

  // remove
  collection.schema.removeField("lxkzpq3a")

  // remove
  collection.schema.removeField("6pnrsnit")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1mtfkns4",
    "name": "balance",
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
    "query": "SELECT \n    accounts.id AS id,\n    SUM(CASE WHEN E.type = 'INCOME' THEN E.amount ELSE 0 END) AS TotalIncome,\n    SUM(CASE WHEN E.type = 'OUTCOME' THEN E.amount ELSE 0 END) AS TotalOutcome\nFROM \n    accounts\nLEFT JOIN \n    expenses E ON accounts.id = E.account\nGROUP BY \n    accounts.id;"
  }

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

  // remove
  collection.schema.removeField("1mtfkns4")

  return dao.saveCollection(collection)
})
