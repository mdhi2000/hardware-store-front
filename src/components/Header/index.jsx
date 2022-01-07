import withUser from "@hocs/withUser"
import axios from "axios"
import { MouseEvent, useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { ScaleLoader } from "react-spinners"
import { Button, Dimmer, Grid, List, Menu, MenuItemProps, Search } from "semantic-ui-react"
import Link from "next/link"
import { useRouter } from "next/dist/client/router"

const HeaderComponent = props => {
  const router = useRouter()
  const [showBlur, setShowBlur] = useState(false)
  const [activeItem, setActiveItem] = useState("")
  const [categoryActiveItem, setCategoryActiveItem] = useState("")

  const getSubCategoriesMutation = useMutation(id => axios.get(`categories/${id}/subcategories`))

  const productSearchMutation = useMutation(name =>
    axios.get(`products/search/name`, {
      params: {
        search: name,
      },
    })
  )

  const { data: parentCategoriesData } = useQuery(
    "parent-categories",
    () => axios.get("categories/parents"),
    {
      onSuccess: data => {
        setCategoryActiveItem(data.data?.[0].title)
        getSubCategoriesMutation.mutateAsync(data.data?.[0]._id)
      },
    }
  )

  useEffect(() => {
    document.body.classList.add("pt-16")
  }, [])

  const handleItemClick = (e, { name }) => {
    if (activeItem === name) {
      setActiveItem("")
      setShowBlur(false)
    } else {
      setActiveItem(name ?? "")
      setShowBlur(true)
    }
  }

  const handleCategoryItemClick = (e, { name }) => {
    setCategoryActiveItem(name ?? "")
    getSubCategoriesMutation.mutateAsync(e.target.getAttribute("data-id"))
  }

  const handleProductSearchClick = (e, { value }) => {
    productSearchMutation.mutateAsync(value)
  }

  const handleSearchResultSelect = (e, data) => {
    router.push("/product/" + data.result._id)
  }

  const handleRenderResult = result => <Search.Result title={result.name} image={result.imageUrl} price={result.price.toLocaleString("fa-IR") + " تومان"} />

  return (
    <>
      <Menu
        pointing
        borderless
        className="fixed top-0 right-0 left-0 w-full h-16 shadow bg-white flex items-center justify-between px-5 rtl z-40 transition-all delay-200"
      >
        <Menu.Menu attached="top" tabular="true" position="right">
          <Menu.Item
            name="دسته بندی ها"
            active={activeItem === "دسته بندی ها"}
            onClick={handleItemClick}
          />
          <Menu.Item name="اسمبل" active={activeItem === "اسمبل"} onClick={()=> router.push("/assemble")} />
        </Menu.Menu>
        <Menu.Menu position="left">
          <Menu.Item>
            <Search
              noResultsMessage="موردی یافت نشد"
              loading={productSearchMutation.isLoading}
              onSearchChange={handleProductSearchClick}
              onResultSelect={handleSearchResultSelect}
              resultRenderer={handleRenderResult}
              results={productSearchMutation.data?.data}
              onFocus={() => setShowBlur(true)}
              onBlur={() => setShowBlur(false)}
              className="rtl"
            />
          </Menu.Item>
          <Menu.Item>
            {props.user ? (
              <Button
                icon="shopping cart"
                circular
                className="!bg-transparent hover:!bg-[#cacbcd] active:!bg-[#babbbc]"
              />
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="!bg-primary !text-white hover:!bg-opacity-80 active:!bg-opacity-60"
              >
                ثبت نام / ورود
              </Button>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {/* <div className="fixed top-0 right-0 left-0 w-full h-16 shadow bg-white flex items-center justify-between px-5 rtl z-40 transition-all delay-200">
        <div>
        </div>
        <div>
          <Button
            icon="shopping cart"
            circular
            className="!bg-transparent hover:!bg-[#cacbcd] active:!bg-[#babbbc]"
          />
        </div>
      </div> */}
      <div
        className={`z-30 fixed bottom-0 left-0 right-0 top-16 transition-all delay-200 flex justify-center ${
          showBlur ? "backdrop-blur-sm" : "backdrop-blur-none hidden"
        }`}
        onClick={() => {
          setActiveItem("")
          setCategoryActiveItem(parentCategoriesData.data[0].title)
          setShowBlur(false)
        }}
      >
        {["دسته بندی ها"].includes(activeItem) && (
          <section
            onClick={e => e.stopPropagation()}
            className="container bg-white shadow-lg h-[fit-content] rounded-b-lg stop-click"
          >
            <Grid>
              <Grid.Column stretched width={12}>
                {getSubCategoriesMutation.isLoading ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <ScaleLoader color="#75acb9" />
                  </div>
                ) : getSubCategoriesMutation?.data?.data.length > 0 ? (
                  <div className="p-5">
                    <List floated="right">
                      {getSubCategoriesMutation?.data?.data.map(item => (
                        <List.Item>
                          <Link
                            href={`category/${item.key}`}
                            className="text-decoration-none !text-red-400 hover:!text-primary"
                          >
                            {item.title}
                          </Link>
                        </List.Item>
                      ))}
                    </List>
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center text-secondary">
                    این دسته بندی خالی می باشد
                  </div>
                )}
              </Grid.Column>

              <Grid.Column width={4}>
                <Menu fluid vertical tabular="right" className="!bg-[#eee] !rounded-br-lg">
                  {parentCategoriesData?.data?.map?.(item => (
                    <Menu.Item
                      name={item.title}
                      key={item._id}
                      data-id={item._id}
                      active={categoryActiveItem === item.title}
                      onClick={handleCategoryItemClick}
                    />
                  ))}
                </Menu>
              </Grid.Column>
            </Grid>
          </section>
        )}
      </div>
    </>
  )
}

const Header = withUser(HeaderComponent)

export default Header
