const express=require('express')
const app=express()
const cors=require('cors')

const userRoutes=require('./routes/userRoutes')
const journalRoutes=require(
    './routes/journalRoutes'
)
const port=process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
  }));
  

app.get('/',(req,res)=>{
    res.send("randi randi kurchondi");
})
app.use('/users',userRoutes)
app.use('/journal',journalRoutes)

app.listen(port,() =>{
    console.log(`server is running on port ${port}`)
})