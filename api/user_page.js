const express=require('express')
const uPage=express.Router()
const { v4 } =require("uuid")
// const emitter=require("emitter")
const userDB= require("./users")
const authRoute=require("./auth")

// uPage.use(emitter.setMaxListeners())
uPage.use(authRoute.userSession)


function checkRoute(req,res,next){
	if (req.session.user){
		if (req.session.user.name===req.params.user_id)
			return res.render("user",{"user":req.session.user,"name":req.params.user_id })
		else
			next()
	} 
	else
		next()
}

function checkUser(req,res,next){
	const cUser=req.params.user_id

	userDB.pool.getConnection(async (err,connect)=>{
		if (err) return console.log(err)

		await connect.query("SELECT * FROM users",(err,output)=>{
			if (!err){

				let checks=output.find(user => user.name==cUser)
				console.log(`checks ${checks}`)
				if (checks)
					next()
				else 
					return res.send(`<h2> Pls  ${cUser} is not a valid user </h2>`)
			}else
				console.log(err)
		})
	})
	
}



function handlePost(req,res,next){
	const cUser=req.params.user_id
	const userTags="null"
	userDB.pool.getConnection((err,connection)=>{
		if (err) return console.log(err)

		connection.query("SELECT * FROM users",(err,data)=>{

			let foundUser=data.find(user => user.name==cUser)

			const newParams={id:v4(), name:"Anonymous",time:new Date(),message:req.body.message,tags:userTags,user_id:foundUser.id}


			connection.query("INSERT INTO messages SET ?",[newParams],(err,msg)=>{
				if (err)
					return console.log(err)
				else
					next()
			})
		})

	})

}


uPage.get("/:user_id",checkRoute,checkUser,(req,res)=>{

	return res.render("user",{"user":"","name":req.params.user_id })
	
})

uPage.post("/:user_id",handlePost,(req,res)=>{

	res.redirect(`/u/${req.params.user_id}`)
})



function getMessages(req,res,next){
	const username=req.session.user.name
	userDB.pool.getConnection((err,connection)=>{
		if (err) return console.log(err)
   
		connection.query("SELECT * FROM users",(err,data)=>{

			let foundUser=data.find(user => user.name==username)
			console.log(foundUser)
			connection.query("SELECT * FROM messages WHERE user_id=?",[foundUser.id],(err,output)=>{
				console.log(output)
				if (!err){
					res.render('regular/r_message',{data:output,user:foundUser.name})
				}
			})
		})

	})
 
}



module.exports={route:uPage,msgs:getMessages}
