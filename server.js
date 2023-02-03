const app = require('fastify')({
    logger: true
})
const fs = require('fs')

// let MJson = fs.readFileSync('./data/dbs.json', 'utf-8')
let dbs = JSON.parse(fs.readFileSync('./data/dbs.json', 'utf-8'))


app.get('/dbs', async(req, res) => {
  res.send(dbs)
})

app.head('/dbs/:dbId', (req, res) => {
    const dbId = req.params.dbId
  
    const db = dbs.movies.find(db => db.id === Number(dbId))
  
    if (db) {
      res.header('Content-Length', JSON.stringify(db).length)
      res.send()
    } else {
      res.status(404).send({ 'message': `Item with id: ${dbId} not found` })
    }
  })
  
  app.patch('/dbs/:dbId', (req, res) => {
    console.log("hey")
    const dbId = req.params.dbId
    const updatedName = req.body.name
  
    // Find the item with the given ID
    const db = dbs.movies.find(db => db.id === Number(dbId))
  
    // If the item was found, update its name and return the updated item
    if (db) {
      db.name = updatedName
      res.send(db)
    } else {
      // If the item was not found, return a not found error
      res.status(404).send({ 'message': `Item with id: ${dbId} not found` })
    }
  })
  
  
app.delete('/dbs/:dbId', (req, res) => {
    const dbId = req.params.dbId
  
    const dbIndex = dbs.movies.findIndex(db => db.id === Number(dbId))
  
    if (dbIndex !== -1) {
      dbs.movies.splice(dbIndex, 1)
      res.send({ 'message': `Item with id: ${dbId} was deleted` })
    } 
    else {
    
      res.status(404).send({ 'message': `Item with id: ${dbId} not found` })
    }
  })
  

app.listen(3000, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Server running on port 3000')
})
