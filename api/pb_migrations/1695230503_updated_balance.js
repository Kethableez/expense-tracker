/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b22ig0l7dr2x26i")

  collection.options = {
    "query": "SELECT id, (income - outcome) as balance FROM (\n  SELECT \n    accounts.id AS id,\n    SUM(CASE WHEN exp.type = 'INCOME' THEN exp.amount ELSE 0 END) AS income,\n    SUM(CASE WHEN exp.type = 'OUTCOME' THEN exp.amount ELSE 0 END) AS outcome\nFROM \n    accounts\nLEFT JOIN \n    expenses exp ON accounts.id = exp.account\nGROUP BY \n    accounts.id\n)"
  }

  // remove
  collection.schema.removeField("1mtfkns4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ymwaa738",
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
    "query": "SELECT id, (TotalIncome - TotalOutcome) as balance FROM (\n  SELECT \n    accounts.id AS id,\n    SUM(CASE WHEN E.type = 'INCOME' THEN E.amount ELSE 0 END) AS TotalIncome,\n    SUM(CASE WHEN E.type = 'OUTCOME' THEN E.amount ELSE 0 END) AS TotalOutcome\nFROM \n    accounts\nLEFT JOIN \n    expenses E ON accounts.id = E.account\nGROUP BY \n    accounts.id\n)"
  }

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

  // remove
  collection.schema.removeField("ymwaa738")

  return dao.saveCollection(collection)
})
