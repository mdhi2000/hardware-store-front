import withHeader from "@hocs/withHeader"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Form, Header, Segment } from "semantic-ui-react"

const LoginPage = () => {
  const { handleSubmit } = useForm()

  useEffect(() => {
    document.getElementById("__next").classList.add("h-full")
    document.querySelector("#__next > div").classList.add("h-full")
    return () => {
      document.getElementById("__next").classList.remove("h-full")
      document.querySelector("#__next > div").classList.remove("h-full")
    }
  }, [])

  const onSubmit = e => {}

  return (
    <div className="h-full w-full flex items-center justify-center bg-secondary">
      <Segment className="shadow-lg rounded-lg bg-white p-10 py-5 rtl">
        <Header className="!text-secondary">ورود</Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Input label="نام کاربری" />
          <Form.Input label="نام کاربری" name />
          <Form.Button>ورود</Form.Button>
        </Form>
      </Segment>
    </div>
  )
}

const Login = withHeader(LoginPage)

export default Login
