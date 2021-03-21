const express=require('express')
const port = process.env.PORT || 3000
const compression=require('compression')
const saltedMd5=require('salted-md5')
const path=require('path');
const app = express()
const multer=require('multer')
const upload=multer({storage: multer.memoryStorage()})
require('dotenv').config()
app.use(express.urlencoded())
app.use(express.json());
// view engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')
app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))


var admin = require("firebase-admin");

var serviceAccount = require("./firebaseupload.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dococ-a78a4-default-rtdb.firebaseio.com",
  storageBucket: process.env.BUCKET_URL
});
app.locals.bucket = admin.storage().bucket()
let db=admin.firestore();

let a=db.collection('users')
app.post('/data',async (req,res)=>{
  let docRef=a.doc(req.body.user.name)
  await docRef.set({
    hobby: req.body.user.hobby,
    age: req.body.user.age,
  });
  res.send('done');
})

// app.get('/', (req, res) => {
// res.sendFile(path.join(__dirname, './index.html'));
// })





//static 
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/bootstrap',express.static(__dirname + 'public/bootstrap'))
app.use('/images',express.static(__dirname + 'public/images'))


app.set('view-engine','ejs')

app.get('/',(req,res) => {
  res.render('index.ejs',{name:'ajay'})
})

app.get('/login',(req,res) => {
  res.render('login.ejs')
})

app.get('/about',(req,res) => {
  res.render('about.ejs')
})

app.get('/contact',(req,res) => {
  res.render('contact.ejs')
})

app.get('/doc',(req,res) => {
  res.render('doc.ejs')
})

app.get('/register',(req,res) => {
  res.render('register.ejs')
})
app.get('/logout',(req,res) => {
  res.render('logout.ejs')
})





app.post('/',upload.single('file'),async(req,res)=>{
  const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
  const fileName = name + path.extname(req.file.originalname)
  await app.locals.bucket.file(fileName).createWriteStream().end(req.file.buffer)
  res.send('done');
})


app.listen(port, (req,res)=>{
  console.info(`Running on ${port}`)
})






