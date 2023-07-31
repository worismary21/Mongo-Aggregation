import user from '../models/userModel';
import Book from '../models/books'
import {Request, Response, NextFunction} from 'express';
import {saltGenerator, passwordGenerator, hashPassword, tokenGenerator} from '../utilities/utility'
import bcrypt from 'bcryptjs'
import {emailHtml, sendmail, } from '../utilities/notification'

export const createUser = async(req:Request, res:Response, next:NextFunction)=>{
   try{
    const {firstName, lastName, email} = req.body;
    const findUser = await user.findOne({email})
    
    if(findUser){
        return res.status(500).json({
            message: `User already Exists`
        })
    }
    const salt = await saltGenerator()

    const password = await passwordGenerator(lastName)

    const hashedPassword = await hashPassword(password, salt)

    if (!findUser){
         let newUser = await user.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role: 'Author',
            books: []
         })

         
         
         
         
    const mainUser = await user.findOne({email})

    if(mainUser){
      const html = emailHtml(email, password)
      await sendmail(`${process.env.GMAIL_USER}`, email, "Welcome", html)
      return res.status(200).json({
          message: `User created successfully`,
          role: mainUser.role
      })
  }
  return res.status(401).json({
      message: `Unable to create user`
  })
}

}catch(err){
  return res.status(500).json({
      message: `Internal Server Error`,
      Error: '/users/create'
  })
}
}

export const login = async(req:Request, res:Response)=>{
  try{
      const {email, password} = req.body;

      const users = await user.findOne({where: email})

      if(!users){
          return res.status(404).json({
              message: `User does not exist, please register`
          })
      }

      if(user){
          const validate = await bcrypt.compare(password, users.password)
          if(!validate){
              return res.status(400).json({
                  message: `Invalid Password`
              })
          }
          if(validate){
              const token = await tokenGenerator(`${users._id}`)
              res.cookie(`token`, token)
              return res.status(200).json({
                  message: `Login successful`,
                  email: users.email
              })
          }
      }
  }catch(err){
      return res.status(500).json({
          message: `Internal Server Error`,
          Error: '/users/login'
      })
  }
}

export const getAll = async(req:Request, res:Response)=>{
  try{
      const allUsers = await user.find({})
      if(!allUsers){
          return res.status(404).json({
              message: `Users not fetched`
          })
      }
      return res.status(200).json({
          message: `Users fetched successfully`,
          allUsers
      })
  }catch(err){
      return res.status(500).json({
          message: `Internal Server Error`,
          Error: '/users/login'
      })
  }
}

export const updateUser = async(req:Request, res:Response)=>{
  try{
      const {email, firstName, lastName} = req.body;

      const users = await user.findOne({email})

      if(!users){
          return res.status(404).json({
              message: `User does not exist`
          })
      }
     const updatedUser = await user.findOneAndUpdate({email}, {firstName, lastName})

     if(updatedUser){
      return res.status(200).json({
          message: `User updated successfully`,
          updatedUser
      })
     }
     return res.status(401).json({
      message: `Bros e no work, go find work`
     })
  }catch(err){
      return res.status(500).json({
          message: `Internal Server Error`,
          Error: '/users/login'
      })
  }
}

export const deleteUser = async(req:Request, res:Response)=>{
  try{
      const {email} = req.body;
      const userToDelete = await user.findOneAndDelete({email})
      if(!userToDelete){
          return res.status(500).json({
              message: `I no fit delete am`
          })
      }
      const users = await user.find({})
      return res.status(200).json({
          message: `Deleted successfully`,
          users
      })
  }catch(err){
      return res.status(500).json({
          message: `Internal Server Error`,
          Error: '/users/login'
      })
  }
}