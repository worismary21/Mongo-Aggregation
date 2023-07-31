import mongoose, {Schema} from 'mongoose';


export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    books: [Record<string, string>] 
}

const userSchema = new Schema({
    firstName: {
        type: String,
        require: [true, 'please input first name']
    }, 
    lastName: {
        type: String,
        require: [true, 'please input last name']
    },
    email: {
        type: String,
        require: [true, 'please input email address']
    }, 
    password: {
        type: String,
        require: [true]
    },
    role: {
        type: String,
        require: [false]
    }, 
    books: {
        type: Array,
        require: [false]
    }
},
{
      timestamps: true
}
)

const User = mongoose.model<IUser>('User', userSchema)

export default User