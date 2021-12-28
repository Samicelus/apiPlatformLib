const options = {
    "server_url": "http://localhost:7001",
    "login": "monitor",
    "password": "pJ2@YwzE"
}

const apiPlatform = require('../index.js')(options)


async function run(){
    let jwt = await apiPlatform.getJWT()
    console.log(jwt)
}

run()