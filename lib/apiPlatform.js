/**
 * 接口平台相关接口调用
 * 目前考虑即使私有部署医院，也使用公共接口平台，故URL和用户名密码采用在lib文件里配置方法
 */

const TOKEN_EXPIRE = 22 * 60 * 60; //接口平台token过期时间为1d, 提前2小时过期
const axios = require('axios');

class ApiPlatform {
    constructor({server_url, login, password}){
        this.API_PLATFORM_URL = server_url;
        this.LOGIN = login;
        this.PASSWORD = password;
        this.jwt = "";
        this.expire = 0;
    }

    /**
     * 
     * @returns 获取接口平台token
     */
    async getJWT(){
        let now = new Date().getTime()
        if(now < this.expire){
            return this.jwt;
        }else{
            let requestOptions = {
                url: `${this.API_PLATFORM_URL}/v1/public/user/getToken`,
                method: 'POST',
                data: {
                    login: this.LOGIN,
                    password: this.PASSWORD
                },
                headers: {
                    "Content-Type": "application/json"
                },
                dataType: 'json'
            }

            let callRes = await axios(
                requestOptions
            )

            if(callRes.status > 399){
                throw new Error('接口平台服务错误');
            }

            if(!callRes.data.result){
                throw new Error(callRes.data.message);
            }

            let token = callRes.data.token;

            this.jwt = token;

            this.expire = new Date().getTime() + TOKEN_EXPIRE * 1000;

            return token
        }
    }

    /**
     * 获取接口平台配置的接口列表
     */
    async getCompanyApiList({company_id}){

        let jwt = await this.getJWT();

        let requestOptions = {
            url: `${this.API_PLATFORM_URL}/v1/public/api/companyApis`,
            method: 'GET',
            params: {
                company_id
            },
            headers: {
                "Content-Type": "application/json",
                "b-json-web-token": jwt
            },
            dataType: 'json'
        }

        let callRes = await axios(
            requestOptions
        )

        if(callRes.status > 399){
            throw new Error('接口平台服务错误');
        }

        if(!callRes.data.success){
            throw new Error(callRes.data.message);
        }

        return callRes.data?callRes.data.list:[];
    }


    /**
     * 调用接口
     */
    async callApi({company_id, tagName, params}){
        let jwt = await this.getJWT();

        let requestOptions = {
            url: `${this.API_PLATFORM_URL}/v1/public/api/call`,
            method: 'POST',
            data: {
                company_id,
                tagName,
                params
            },
            headers: {
                "Content-Type": "application/json",
                "b-json-web-token": jwt
            },
            dataType: 'json'
        }

        let callRes = await axios(
            requestOptions
        )

        if(callRes.status > 399){
            throw new Error('接口平台服务错误');
        }

        if(!callRes.data.success){
            throw new Error(callRes.data.message);
        }

        return callRes.data;
    }

}

module.exports = ApiPlatform