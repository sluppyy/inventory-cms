/* eslint-disable @typescript-eslint/no-var-requires */
const jwt = require('jsonwebtoken')
require('dotenv').config()

const newToken = jwt.sign({ admin: 1 }, process.env.ADMIN_SECRET)

console.log(newToken)
