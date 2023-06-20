const bcrypt = require(`bcrypt`);
const { getAllDB, createUserDB, getUserByEmailDB } = require(`../repository/user.repository`);

const salt = 10;

async function getAll() {
  const data = await getAllDB();
  if (!data.length) throw new Error(`DB is empty`);

  return data;
}

async function createUser(name, surname, email, pwd) {
  const findUser = await getUserByEmailDB(email);
  if (findUser.length) throw new Error(`user already exist`);

  const hashPwd = await bcrypt.hash(pwd, salt);

  const data = await createUserDB(name, surname, email, hashPwd);
  if (!data.length) throw new Error(`not created`);

  return data;
}

async function authorizationUser(email, pwd) {
  const findUser = await getUserByEmailDB(email);
  if (!findUser.length) throw new Error(`user not found`);

  const hashPwd = findUser[0].pwd;

  const isMatch = await bcrypt.compare(pwd, hashPwd);

  if (!isMatch) throw new Error(`pwd not match`);

  return findUser;
}

module.exports = { getAll, createUser, authorizationUser };
