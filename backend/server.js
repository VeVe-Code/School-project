let express = require('express')
let morgan = require('morgan')
let app = express()
app.use(express.static('public'))
let cookieParser = require('cookie-parser')
require('dotenv').config()
let Routercourse = require('./routes/courses')
let Routerknowledge = require('./routes/knowledge')
let AdminRoute = require('./routes/admins')
let Authmiidleware = require('./middleware/Authmiddleware')
let FounderRoute = require('./routes/founder')
let CfounderRoute = require('./routes/cfounder')
let ClecturerRoute = require('./routes/clecturers.js')
let CpublicRoute =require('./routes/publicCourses.js')
let Cknowledge = require('./routes/publicKnowledge.js')
let ContactusRoute = require('./routes/publicContactus.js')
let QuanityRoute =require('./routes/quantity.js')
const mongoose = require('mongoose');
var cors = require('cors')
let mongoURL = 'mongodb+srv://alina:test123@cluster0.zezpfd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoURL).then(()=>{
    console.log('connect to db')
    app.listen(process.env.PORT,()=>{
    console.log('server is running ' + process.env.PORT)
})
    }
)
let LecturerRoute = require('./routes/lecturers')
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/',(req, res)=>{
    return res.json({msg: "hello world"})
})
app.use('/api/courses',Authmiidleware,Routercourse)
app.use('/api/knowledge',Routerknowledge)
app.use('/api/admins',AdminRoute)
app.use('/api/lecturers',LecturerRoute)
app.use('/api/publicknowledge',Cknowledge)
app.get('/set-cookie',(req,res)=>{
    res.cookie("name","VeVe")
    res.cookie("important","Moshi",{httpOnly:true})
    return res.json({msg:"set-cookie"})
})
app.use('/api/founder',Authmiidleware,FounderRoute)
app.use('/api/cfounder',CfounderRoute)
app.use('/api/publiclectures',ClecturerRoute)
app.use('/api/publiccourses',CpublicRoute)
app.use('/api/contactus',ContactusRoute)
app.use('/api/quantity',QuanityRoute)
app.get('/get-cookie',(req,res)=>{
   let cookies = req.cookies
   return res.json(cookies)
})

