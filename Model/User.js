const path = require('path');
const fs = require('fs').promises

const User = {
    filePath: path.resolve(__dirname, '../DB/usersDB.json'),

    findAll: async () => {
        const users = await fs.readFile(User.filePath, 'utf-8')
        return JSON.parse(users);
    },

    findUser: async (email) =>{
        const users = await User.findAll()
        return users.find(user => user.email === email)
    },

    findUserIndex: async (email) => {
        const users = await User.findAll()
        return users.findIndex(user => user.email === email)
    },

    writeDB: async (users) => {
        return fs.writeFile(User.filePath, users, 'utf-8')
    },

    update: async (id, userData) =>{
        const userIndex = await User.findUserIndex(user.email)

        users[userIndex] = userData
        User.writeDB()
    }
}

User.findUser('jaimemenendezalvarez@gmail.com')
    .then(user => User.writeDB())