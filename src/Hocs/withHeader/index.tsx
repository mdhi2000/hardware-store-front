import Header from "../../components/Header/index"
import { NextPage } from "next"
import React from "react"

const withHeader = (Page: NextPage) => {
  const WithHeader: NextPage = (props) => (
    <div>
      <Header />
      <Page {...props} />
    </div>
  )
  return WithHeader
}

export default withHeader
