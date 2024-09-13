import Axios from 'axios'

const baseURL = process.env.NUXT_PUBLIC_BACKEND_URL

const axios = Axios.create({
    headers: {
        "X-Requested-With": 'XMLHttpRequest',
    },
    baseURL: `${baseURL}`,
    withXSRFToken: true,
    withCredentials: true,
})

export const csrf = () => axios.get(baseURL + '/sanctum/csrf-cookie')

export default axios
