const path = require('path');
const fs = require('fs').promises
const bcrypt = require('bcryptjs')

const User = {
    filePath: path.resolve(__dirname, '../DB/usersDB.json'),

    findAll: async () => {
        const users = await fs.readFile(User.filePath, 'utf-8')
        return JSON.parse(users);
    },

    findUserByEmail: async (email) =>{
        const users = await User.findAll()
        return users.find(user => user.email === email)
    },

    findUserIndexByEmail: async (email) => {
        const users = await User.findAll()
        return users.findIndex(user => user.email === email)
    },

    findUserById: async (id) =>{
        const users = await User.findAll()
        return users.find(user => user.id === id)
    },

    findUserIndexById: async (id) => {
        const users = await User.findAll()
        return users.findIndex(user => user.id === id)
    },

    writeDB: async (users) => {
        return fs.writeFile(User.filePath, JSON.stringify(users, null, 2), 'utf-8')
    },

    generateId: (collection) => {
        if(collection)
            return collection[collection.length - 1].id + 1 
        return 1
    },

    create: async (userData) => {
        const users = await User.findAll()
        const newUser = {...userData, id: User.generateId(users)}
        users.push(newUser)
        User.writeDB(users) 
        return newUser  
    },

    delete: async (id) => {
        let users = await User.findAll()
        users = users.filter(user => user.id !== id)
        User.writeDB(users)
    }
}


console.log(bcrypt)
console.log(bcrypt.hashSync('Juana123',10))
