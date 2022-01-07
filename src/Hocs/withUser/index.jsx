import { useQuery } from "react-query"
import axios from "axios"
import { CircleLoader } from "react-spinners"
import { useEffect } from "react"
import { useRouter } from "next/dist/client/router"

const withUser = (Component, toLocation = null) =>
  function WithUserWrapper(props) {
    const router = useRouter()
    const { data, isLoading, isError , error} = useQuery("whoAmI",
     () => axios.get("auth/whoAmI"),{
      retry: false,
    })

    useEffect(() => {
      if(isError && data?.status == 403 && toLocation) router.push(toLocation)
    }, [isError])

    if (isLoading && data === undefined)
      return (
        <div className="bg-white fixed flex w-full h-full items-center justify-center z-[9999]">
          <CircleLoader isLoading={isLoading} color="#75acb9" />
        </div>
      )
    return <Component {...props} user={data?.status?.toString?.().match(/^2\d\d$/)  ? data.data : null} />
  }

export default withUser
