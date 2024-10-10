import app from '../app.js'

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})

app.get('/', (_req, res) => {
  res.send('Owl my eyes')
})

