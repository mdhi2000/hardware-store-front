import "semantic-ui-css/semantic.min.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import axios from "axios"
import { getAccessToken, isAccessTokenValid, setAccessToken } from "@global/accessToken"
import { useEffect } from "react"

const queryClient = new QueryClient()

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || ""

axios.defaults.baseURL = baseURL

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    if (!isAccessTokenValid())
      fetch(baseURL + "/auth/refresh")
        .then(res => res.json())
        .then(res => res.statusCode !== 403 && setAccessToken(res.accessToken))
        .catch(err =>console.log(err))
    if (config.headers)
      config.headers.authorization = getAccessToken() ? `bearer ${getAccessToken()}` : ""
    config.withCredentials = true
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Array.from(document.getElementsByClassName("stop-click")).forEach(el => {
      el.addEventListener("click", e => e.stopPropagation())
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
