// https://nuxt.com/docs/api/configuration/nuxt-config

const envPublicDict: { [key: string]: string | boolean } = {}
Object.keys(process.env)
    .filter((key: string) => key.startsWith('NUXT_PUBLIC'))
    .map((key: string) => envPublicDict[`process.env.${key}`] = JSON.stringify(process.env[key]))

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true, componentInspector: false},
    modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/icon', '@pinia/nuxt'],
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui'
    },
    vite: {
        define: {
            ...envPublicDict
        }
    }
})