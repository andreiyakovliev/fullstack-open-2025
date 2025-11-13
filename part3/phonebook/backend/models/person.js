import mongoose from "mongoose";

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to:', url);

mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connectint to MongoDB', error.message);
    })

const personsSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Persons', personsSchema)

export default Person