const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//Dataset
const students = [
{
    id: 1,
    name: "Angelo1",
    yearLevel: 2,
},
{
    id: 2,
    name: "Angelo2",
    yearLevel: 2,
},
{
    id: 3,
    name: "Angelo3",
    yearLevel: 2,
},
]

//API endpoints
app.get('/api/students',(req, res)=> {
    res.json(students)
})
//ADD NEW STUDENT
app.post('/api/students',(req, res)=> {
    const {name,yearLevel} = req.body
    const newStudent = {name, yearLevel}
    students.push(newStudent)

    res.json(201).json({
        message: "Student Addded Successfuly",
        student: newStudent
    })
})
//Listen for incoming requests
app.listen(port, () => {
    console.log('Server running on http://localhost:${port}')
})