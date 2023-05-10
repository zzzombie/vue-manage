import axios from 'axios'
import config from '../config'
// axios二次封装
//判断运行环境，开发/生产，来改变接口请求的地址
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.dev.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            console.log(response,'response拦截器');
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error,'error拦截器');
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    //接口请求
    request(options){
        const instance = axios.create()
        options = {...this.getInsideConfig(),...options}
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)