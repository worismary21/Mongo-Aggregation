import mongoose from 'mongoose';

export const connectDatabase = async()=>{
     try{
        const connect = mongoose.connect('mongodb+srv://worismimiyete:z4Z7YLjJhbC435wR@cluster0.82nev0r.mongodb.net/week-9-task')
        console.log(`MongoDB Connected Successfully`)
     }catch(err){
        console.log(err)
     }
}