function isValidUser(req, res, next) {
  const { name, surname, email, pwd } = req.body;

  if (!name) throw new Error(`name empty`);
  if (!surname) throw new Error(`surname empty`);
  if (!email) throw new Error(`email empty`);
  if (!pwd) throw new Error(`pwd empty`);

  if (!isNaN(name)) throw new Error(`name should be not a number`);
  if (!isNaN(surname)) throw new Error(`surname should be not a number`);
  // eslint-disable-next-line no-useless-escape
  if (!/^[\w\.\-\_]+@[a-z]{2,10}.[a-z]{2,10}$/gm.test(email)) throw new Error(`incorrect email`);
  if (pwd.length < 8) throw new Error(`incorrect pwd less 8 sumbols`);

  next();
}

module.exports = { isValidUser };
