import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const testSchema = Schema({
    image: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

export default model('test', testSchema);