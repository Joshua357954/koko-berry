const express=require("express")
const authRoute=express.Router()
const session= require('express-session')
const mysqlSession= require("express-mysql-session")(session)
const bcrypt=require('bcrypt')
const { v4 } =require("uuid")
const usersModel=require("./users")
const Messages=require("./messages")


//  User Session 
let DBsession= new mysqlSession(usersModel.sessionConfig) 

let userSession=session({
	secret:"xxx.ddcldc,eoeciv399339ced-11-2-33-2-c,cldpflfvppv,vf99deeccd,dlee",
	store:DBsession,
	resave:false,
	saveUninitialized:false,
})



//  Middlewares 

authRoute.use(userSession)

function checkEmailExists(req,res,next){
	
	usersModel.pool.getConnection((err,connection)=>{
		if (err) return console.log(err)
		connection.query("SELECT * FROM users ",(err,ress)=>{
			if (!err){
				let user=ress.find(user => user.name.toLowerCase()==req.body.name.toLowerCase())
				let uemail=ress.find(user => user.email.toLowerCase()==req.body.email.toLowerCase())
				if (user)
					res.render("auth/signup",{message:user.name})
				else if (uemail)
					res.render("auth/signup",{message:uemail.email})
				else
					next()
			}
		})
	})
}


function checkLogin(req,res,next){

	usersModel.pool.getConnection((err,connection)=>{
		if (err) return console.log(err)

		connection.query("SELECT * FROM users ",(err,ress)=>{
			if (!err){
				let user=ress.find(user => user.name==req.body.name)
				if (user){
					
					if (user.password==req.body.password)
						next()
					else
						res.render("auth/login",{message:"Incorrect Password "})
				}else
					res.render("auth/login",{message:"This User does not exists"})	
			}
		})
	})
}

function loginRequired(req,res,next){

	if (req.session.user)
		next()
	else
		res.redirect('/login')
}

function logoutRequired(req,res,next){

	if (req.session.user)

		res.redirect('/') 
	else
		next()

}








// Register route

authRoute.get('/signup',logoutRequired,(req,res)=>{

	res.render('auth/signup',{message:""})
})



authRoute.post('/signup',checkEmailExists,(req,res)=>{
	let id=v4()

	usersModel.pool.getConnection((err,connection)=>{
		if (err) return console.log(err)

		let newRes={"id":id,name:req.body.name,email:req.body.email,password:req.body.password,date:new Date()}
		connection.query("INSERT INTO users SET ?",[newRes],(err,ress)=>{
			if (err)
				console.log(err)
		})

	})

	res.redirect('/login')	
})




// Login route

authRoute.get('/login',logoutRequired,(req,res)=>{
	res.render("auth/login",{message:"",name:""})

})

authRoute.post('/login',checkLogin,(req,res)=>{

	req.session.user=req.body

	res.redirect('/')	
})

  



// Log out route
authRoute.get('/logout',loginRequired,(req,res)=>{
	req.session.destroy()
	res.render('home',{user:""})

})



authRoute.get("/all_users",(req,res)=>{
	let newRow=[]
	usersModel.pool.getConnection((err,connection)=>{
		if (err) return console.log(err)
			
		connection.query("SELECT * FROM users",(err,row)=>{
			row.map(item => newRow.push({"name":item.name}))
			return res.json({"message":newRow})
		})
	})


})
 


module.exports={"auth":authRoute,"userSession":userSession,"loginRequired":loginRequired}


