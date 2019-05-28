import axios from 'axios'
// import Nprogress from 'nprogress'

let loadFunction = config => {
  return config
}
let finishFunction = response => {
  // Nprogress.done()
  return response
}
let errorFunction = error => {
  // Nprogress.done()
  return Promise.reject(error)
}

const axiosInstanceUserApi = axios.create({
  baseURL: 'http://localhost:8080/'
})

axiosInstanceUserApi.interceptors.request.use(loadFunction)

axiosInstanceUserApi.interceptors.response.use(finishFunction, errorFunction)

let clients = {
  $http: {
    get () {
      return {
        userapi: axiosInstanceUserApi
      }
    },
    post () {
      return {
        userapi: axiosInstanceUserApi
      }
    },
    put () {
      return {
        userapi: axiosInstanceUserApi
      }
    },
    patch () {
      return {
        userapi: axiosInstanceUserApi
      }
    },
    delete () {
      return {
        userapi: axiosInstanceUserApi
      }
    }
  }
}

export default (Vue) => {
  Object.defineProperties(Vue.prototype, clients)
}
