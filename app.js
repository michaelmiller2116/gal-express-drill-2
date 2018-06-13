const express = require('express')
const data = require('./instructorData.json')
const cors = require('cors')

const app = express()
app.use(cors())

function findInstructor(data, id) {
  for (let instructor of data) {
    if(instructor.ID === +id) {
      return instructor
    }
  }
  return null
}

app.get('/', (req, res) => {
  res.json ({ data })
})

app.get('/:id', (req, res) => {
  const instructor = findInstructor(data, req.params.id)
  if (!instructor) {
    res.status(404).json({
      error: {
        message: 'Can not find instructor'
      }
    })
  }
  else {
    res.json({ data: instructor})
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('====================================');
  console.log(`listening on port ${port}`);
  console.log('====================================');
})