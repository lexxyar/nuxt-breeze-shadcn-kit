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
// axios.interceptors.request.use(function (config) {
//     console.log('intr-request', config)
// })

export const csrf = () => axios.get('/sanctum/csrf-cookie', {baseURL})

export default axios
