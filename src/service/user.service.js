const { createUserDB } = require(`../repository/user.repository`);

async function createUser(name, surname, email, pwd) {
    const data = await createUserDB(name, surname, email, pwd);
    if (!data.length) throw new Error(`not created`);

    return data;
}


module.exports = { createUser }