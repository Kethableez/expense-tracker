/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ct8jp4t2jonuqt6")

  collection.createRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ct8jp4t2jonuqt6")

  collection.createRule = "@request.data.id != ''"

  return dao.saveCollection(collection)
})
