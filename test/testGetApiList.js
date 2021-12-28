const options = {
    "server_url": "http://localhost:7001",
    "login": "monitor",
    "password": "pJ2@YwzE"
}

const apiPlatform = require('../index.js')(options)


async function run(){
    let list = await apiPlatform.getCompanyApiList({company_id:"57ac41595fcef1246d5a756e"})
    console.log(list)
}

run()