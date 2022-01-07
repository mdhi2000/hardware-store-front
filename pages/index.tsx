import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import withHeader from "@hocs/withHeader"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, A11y } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { Button, Card, Header, Image } from "semantic-ui-react"
import { useMutation, useQuery } from "react-query"
import axios from "axios"
import { useRouter } from "next/dist/client/router"

const Home: NextPage = () => {
  const router = useRouter()

  const { data: parentCategoriesData } = useQuery("parent-categories", () =>
    axios.get("categories/parents")
  )

  const { data: productsData, isLoading: productsLoading } = useQuery(["cpu"], categoryKey =>
    axios.get("products/category/key/cpu")
  )
  const { data: motherboardsData } = useQuery(["motherboard"], categoryKey =>
    axios.get("products/category/key/motherboard")
  )
  const { data: ramsData } = useQuery(["ram"], categoryKey =>
    axios.get("products/category/key/ram")
  )

  return (
    <div>
      <section className={`bg-secondary flex items-center justify-center`}>
        <div className="container py-5 rtl">
          <Header>قطعات اصلی {">"} cpu</Header>
          <Card.Group itemsPerRow={6}>
            {productsData?.data?.slice(0,6).map?.((product: any) => (
              <Card raised onClick={() => router.push("/product/" + product._id)}>
                <Image
                  src={
                    product.imageUrl || "https://react.semantic-ui.com/images/wireframe/image.png"
                  }
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>{product.name}</Card.Header>
                  <Card.Meta>
                    <span className="date">{product.price?.toLocaleString("fa-IR")} تومان</span>
                  </Card.Meta>
                  {product.description && (
                    <Card.Description className="!truncate">{product.description}</Card.Description>
                  )}
                </Card.Content>
                {/* <Card.Content extra>
                <Button basic color="green" fluid>
                  افزودن به سبد خرید
                </Button>
              </Card.Content> */}
              </Card>
            ))}
          </Card.Group>
          {/* <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            onSwiper={(swiper: any) => console.log(swiper)}
            navigation
            autoplay
            pagination={{ clickable: true }}
          >
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
          </Swiper> */}
        </div>
      </section>
      <section className={`flex items-center justify-center`}>
        <div className="container py-5 rtl">
          <Header>قطعات اصلی {">"} مادربورد</Header>
          <Card.Group itemsPerRow={6}>
            {motherboardsData?.data?.slice(0,6).map?.((product: any) => (
              <Card raised onClick={() => router.push("/product/" + product._id)}>
                <Image
                  src={
                    product.imageUrl || "https://react.semantic-ui.com/images/wireframe/image.png"
                  }
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>{product.name}</Card.Header>
                  <Card.Meta>
                    <span className="date">{product.price?.toLocaleString("fa-IR")} تومان</span>
                  </Card.Meta>
                  {product.description && (
                    <Card.Description className="!truncate">{product.description}</Card.Description>
                  )}
                </Card.Content>
                {/* <Card.Content extra>
                <Button basic color="green" fluid>
                  افزودن به سبد خرید
                </Button>
              </Card.Content> */}
              </Card>
            ))}
          </Card.Group>
          {/* <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            onSwiper={(swiper: any) => console.log(swiper)}
            navigation
            autoplay
            pagination={{ clickable: true }}
          >
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
          </Swiper> */}
        </div>
      </section>
      <section className={`bg-secondary flex items-center justify-center`}>
        <div className="container py-5 rtl">
          <Header>قطعات اصلی {">"} رم</Header>
          <Card.Group itemsPerRow={6}>
            {ramsData?.data?.slice(0,6).map?.((product: any) => (
              <Card raised onClick={() => router.push("/product/" + product._id)}>
                <Image
                  src={
                    product.imageUrl || "https://react.semantic-ui.com/images/wireframe/image.png"
                  }
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>{product.name}</Card.Header>
                  <Card.Meta>
                    <span className="date">{product.price?.toLocaleString("fa-IR")} تومان</span>
                  </Card.Meta>
                  {product.description && (
                    <Card.Description className="!truncate">{product.description}</Card.Description>
                  )}
                </Card.Content>
                {/* <Card.Content extra>
                <Button basic color="green" fluid>
                  افزودن به سبد خرید
                </Button>
              </Card.Content> */}
              </Card>
            ))}
          </Card.Group>
          {/* <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            onSwiper={(swiper: any) => console.log(swiper)}
            navigation
            autoplay
            pagination={{ clickable: true }}
          >
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
            <SwiperSlide>test</SwiperSlide>
          </Swiper> */}
        </div>
      </section>
    </div>
  )
}

export default withHeader(Home)
