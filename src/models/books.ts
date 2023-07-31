import mongoose, {Schema} from 'mongoose';


export interface Ibooks {
    _id: string,
    name: string,
    description: string,
    page_count: number
} 

const bookSchema = new Schema({
    _id:{
      type: String,
      require: [true]
    },
    name: {
        type: String,
        require: [true]
    },
    description: {
        type: String,
        require: [true]
    },
    page_count: {
        type: String,
        require: [true]
    }
},
{
timestamps: true
} 
)
 
const Book = mongoose.model<Ibooks>('Book', bookSchema)

export default Book;
