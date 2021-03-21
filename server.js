const express = require('express')
const app = express()


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
app.listen(3000)