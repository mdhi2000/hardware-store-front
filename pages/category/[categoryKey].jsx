import { useRouter } from "next/dist/client/router"
import withHeader from "@hocs/withHeader"
import { Breadcrumb, Button, Card, Divider, Icon, Image } from "semantic-ui-react"
import { useQuery } from "react-query"
import axios from "axios"
import { ScaleLoader } from "react-spinners"

const CategoryProductsPage = () => {
  const router = useRouter()
  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    ["category-by-key", router.query.categoryKey],
    () => axios.get("categories/key/" + router.query.categoryKey)
  )

  const { data: productsData, isLoading: productsLoading } = useQuery(
    ["products-in-category-by-key", router.query.categoryKey],
    () => axios.get("products/category/key/" + router.query.categoryKey)
  )

  return (
    <div className="flex flex-col justify-center pt-16 rtl">
      <div className="px-10 pb-5">
        <p className="text-2xl text-primary">
          <Icon name="tag" /> محصولات در دسته بندی {categoryData?.data?.title}
        </p>
      </div>
      <Divider className="!mx-5" />
      <div className="px-16">
        <Breadcrumb>
          <Breadcrumb.Section link href="/" className="!text-secondary">
            <Icon name="home" /> خانه
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="left chevron" />
          <Breadcrumb.Section className="!text-gray-700">
            {categoryData?.data?.parent?.title}
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="left chevron" />
          <Breadcrumb.Section className="!text-gray-700" active>
            {categoryData?.data?.title}
          </Breadcrumb.Section>
        </Breadcrumb>
      </div>
      <div className="pt-10 flex justify-center">
        {productsLoading ? (
          <div className="w-full flex justify-center">
            <ScaleLoader color="#75acb9" />
          </div>
        ) : productsData?.data?.length > 0 ? (
          <section className="container">
            <Card.Group doubling itemsPerRow={4}>
              {productsData?.data?.map?.(product => (
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
                      <Card.Description className="!truncate">
                        {product.description}
                      </Card.Description>
                    )}
                  </Card.Content>
                  <Card.Content extra>
                    <Button basic color="green" fluid>
                      افزودن به سبد خرید
                    </Button>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </section>
        ) : (
          <div className="w-full flex justify-center text-secondary">
            محصولی در این دسته بندی وجود ندارد
          </div>
        )}
      </div>
    </div>
  )
}

const CategoryProducts = withHeader(CategoryProductsPage)

export default CategoryProducts
