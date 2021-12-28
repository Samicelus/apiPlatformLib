Call apis using api platform and implement in your node.js code

# Installation

using npm:

`npm i api-platform-lib`

# Prerequisite

- make sure api platform service runs correctly
- get server_url, login and password from your api platform service provider

# Config api platform client

fill config json object and get client instance

```
const options = {
    "server_url": "http://localhost:7001",
    "login": "monitor",
    "password": "pJ2@YwzE"
};

const client =  require('api-platform-lib')(options);
```

# Usage

get all configured apis of an existing organisation:

```
let list = await client.getCompanyApiList({company_id:"TARGET_COMPANY_ID"})
// [{"name":"API_NAME", "tag_oid":{"tageName":"TAG_NAME_TO_CALL"}, "params":{...PARAM_LIST_TO_CALL}, "paramsExample":{...PARAMS_IN_JSON_FORM}}]
```

call api with tagName and params:

```
let result = await client.callApi({
        company_id:"TARGET_COMPANY_ID",
        tagName: "TAG_NAME_TO_CALL",
        params: {...PARAMS_IN_JSON_FORM}
    })
// {"data":{...CONFIGURED_RETURN}, "success":true, "code":200}
```
