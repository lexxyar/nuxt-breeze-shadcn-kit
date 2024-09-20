import Axios from 'axios'

const baseURL = process.env.NUXT_PUBLIC_BACKEND_URL
const axios = Axios.create({
    headers: {
        "X-Requested-With": 'XMLHttpRequest',
    },
    baseURL: `${baseURL}/api`,
    withXSRFToken: true,
    withCredentials: true,
})
axios.interceptors.request.use(function (config) {
    // console.log('intr-request', config)
    return config
})

export const csrf = async() => {
    const CSRF_COOKIE = "XSRF-TOKEN";
    await axios.get('/sanctum/csrf-cookie', {baseURL})
    return useCookie(CSRF_COOKIE).value
}

export default axios
