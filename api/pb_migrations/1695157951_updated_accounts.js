/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("htsqtflx9n36i00")

  collection.listRule = "@request.auth.is = user.id"
  collection.createRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("htsqtflx9n36i00")

  collection.listRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
