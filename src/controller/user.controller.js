const route = require(`express`).Router();
const { buildResponse } = require(`../helper/buildResponse`);
const { createUser } = require(`../service/user.service`);

route.get(`/`, (req, res) => {
    res.send(`HI PEOPLE`);
})

route.post(`/`, async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd)

        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})


module.exports = route;