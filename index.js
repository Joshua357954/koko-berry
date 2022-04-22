const express=require("express")
const app =express()
const authRoute=require("./api/auth")
const userRoute=require("./api/user_page")
const port = process.env.PORT || 4000


//  Middlewares ...
app.use(express.urlencoded({extended:false}))

app.use(authRoute.userSession)

app.use(express.static("static"))

app.use("/",authRoute.auth)

app.use("/u",userRoute.route)

app.set("view engine","ejs")


app.get('/',(req,res)=>{
	req.session.user
	res.render("home",{user:req.session.user})

})



app.get('/messages',authRoute.loginRequired,userRoute.msgs,(req,res)=>{
	const username=req.session.user
	console.log("I am still under processing ...")

})


app.get("*",(req,res)=>{

	res.render("404")
})






app.listen(port,()=>{ console.log(`Server running on port ${port}`)})





