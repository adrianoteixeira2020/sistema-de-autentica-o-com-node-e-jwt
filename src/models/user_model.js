import mongoose from 'mongoose';
import bcypt from 'bcrypt'

const user_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        selecte: false,
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

user_schema.pre('save', async function(next) {
    const hash = await bcypt.hash(this.password, 10);
    this.password = hash;

    next()
})

const userModel = mongoose.model('User_Model',user_schema)

export default userModel;