import withHeader from "@hocs/withHeader"
import withUser from "@hocs/withUser"
import { useRouter } from "next/dist/client/router"
import { useQuery } from "react-query"
import { Breadcrumb, Button, Divider, Form, Grid, Header, Icon, Image } from "semantic-ui-react"
import axios from "axios"
import { ScaleLoader } from "react-spinners"

const ShowProductPage = ({ user }) => {
  const router = useRouter()
  const { data: productData, isLoading: productLoading } = useQuery(
    ["product", router.query.productId],
    () => axios.get("products/" + router.query.productId)
  )

  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    ["category-by-key", productData?.data?.category?.key],
    () => axios.get("categories/key/" + productData?.data?.category?.key)
  )

  return productLoading ? (
    <div className="w-full flex items-center">
      <ScaleLoader color="#75acb9" />
    </div>
  ) : (
    <div>
      <div className="p-5 px-10 rtl">
        <Breadcrumb>
          <Breadcrumb.Section link href="/" className="!text-secondary">
            <Icon name="home" /> خانه
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="left chevron" />
          <Breadcrumb.Section className="!text-gray-700">
            {categoryData?.data?.parent?.title}
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="left chevron" />
          <Breadcrumb.Section
            link
            href={`/category/${categoryData?.data?.key}`}
            className="!text-secondary"
          >
            {categoryData?.data?.title}
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="left chevron" />
          <Breadcrumb.Section className="!text-gray-700" active>
            {productData?.data?.name}
          </Breadcrumb.Section>
        </Breadcrumb>
      </div>
      <section className="w-full p-5">
        <div className="w-full rounded-xl bg-white shadow-xl border-2 border-gray-100 h-full">
          <Grid stackable celled="internally">
            <Grid.Column width="11" className="rounded-l-lg rtl relative">
              {/* <Grid relaxed divided="vertically"> */}
              <div className="rtl mb-24">
                <Header as="h3" className="!p-5">
                  {productData?.data?.name}
                </Header>
                {productData?.data?.price && (
                  <Header as="p" className="!px-5 !font-normal !text-gray-500">
                    {productData?.data?.price?.toLocaleString?.("fa-IR") + " تومان"}
                  </Header>
                )}
                <div className="px-10 text-gray-800">
                  <span className="block text-gray-800">توضیحات:</span>
                  <p className="px-5 pt-2 text-gray-800">
                    {productData?.data?.description || "ندارد"}
                  </p>
                </div>
              </div>
              <div className="absolute w-full pl-10 bottom-0 pb-5 h-24">
                <Divider />
                <div className="flex justify-end">
                  <Button basic color="green">
                    افزودن به سبد خرید
                  </Button>
                </div>
              </div>
              {/* </Grid> */}
            </Grid.Column>
            {/* <div className="h-full w-px bg-gray-800 border-r-2 border-gray-800 inline-block"></div> */}
            <Grid.Column width="5" className="rounded-r-lg inline-block">
              <Image
                src={
                  productData?.data?.imageUrl ||
                  "https://react.semantic-ui.com/images/wireframe/image.png"
                }
                alt=""
              />
            </Grid.Column>
          </Grid>
        </div>
      </section>
      <section className="w-full p-5">
        <div className="w-full rounded-xl bg-white shadow-xl border-2 border-gray-100 h-full p-5">
          <Header as="h4" className="!p-3 rtl">
            مشخصات فنی
          </Header>
          <Grid columns="2" divided className="!p-10">
            {productData?.data?.features
              ?.filter(x => !x.parent)
              .map(parentFeature => (
                <>
                  <Grid.Row>
                    <Grid.Column width="16">
                      <Header as="h5" className="rtl">
                        {parentFeature.key}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  {productData?.data?.features
                    ?.filter(x => x.parent === parentFeature._id)
                    .map(feature => (
                      <Grid.Row className="!px-10 ">
                        <Grid.Column width="11" className="rtl">
                          {feature.value}
                        </Grid.Column>
                        <Grid.Column width="5" className="rtl">
                          {feature.key}
                        </Grid.Column>
                      </Grid.Row>
                    ))}
                </>
              ))}
          </Grid>
        </div>
      </section>
      <section className="w-full p-5">
        <div className="w-full rounded-xl bg-white shadow-xl border-2 border-gray-100 h-full p-5">
          <Header as="h4" className="!p-3 rtl">
            نظرات کاربران
          </Header>
          <Grid divided="vertically" className="!p-3 rtl">
            {productData?.data?.comments.length > 0 ? (
              productData?.data?.comments?.map?.(() => <Grid.Row></Grid.Row>)
            ) : (
              <Grid.Row className="!w-full !text-center text-secondary">
                نظری برای این محصول ثبت نشده است. اولین نفر باشید
              </Grid.Row>
            )}
            <Grid.Row>
              <Form className="!px-10 w-full">
                <Form.TextArea
                  className="!w-full"
                  label="ثبت نظر"
                  placeholder="نظر خود را با دیگران به اشتراک بگذارید ..."
                />
                <Form.Button>ثبت نظر</Form.Button>
              </Form>
            </Grid.Row>
          </Grid>
        </div>
      </section>
    </div>
  )
}

const ShowProduct = withHeader(withUser(ShowProductPage))

export default ShowProduct
