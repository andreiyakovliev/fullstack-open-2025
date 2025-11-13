import mongoose from 'mongoose';

if (process.argv.length < 3) {
    console.log('Give a password as argument');
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url = `mongodb+srv://andriiyakovliev_db_user:${password}@cluster0.ofddtyl.mongodb.net/personsApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: phoneNumber,
})

const showAllPersons = () => {
    Person
        .find({})
        .then(result => {
            console.log('phonebook:');

            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}


if (process.argv.length === 3) {
    showAllPersons()
} else {
    person.save().then(result => {
        console.log(`added ${name} number ${phoneNumber} to phonebook`);
        mongoose.connection.close()
    })
}