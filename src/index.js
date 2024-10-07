const app = require('../app')
const port = 3000;


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Owl my balls')
})

