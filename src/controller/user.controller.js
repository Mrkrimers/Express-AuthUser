const route = require(`express`).Router();
const { isValidUser } = require(`../helper/validation`);
const { createToken } = require(`../helper/jwt`);
const { buildResponse } = require(`../helper/buildResponse`);
const { getAll, createUser, authorizationUser } = require(`../service/user.service`);

route.get(`/`, async (req, res) => {
  try {
    const data = await getAll();
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post(`/reg`, isValidUser, async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await createUser(name, surname, email, pwd);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post(`/auth`, async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const data = await authorizationUser(email, pwd);

    const token = createToken(data);
    res.setHeader(`authorization`, [`Bearer ${token}`]);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
