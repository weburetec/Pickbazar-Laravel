import { useRouter } from "next/router";
import { useCategoriesQuery } from "@graphql/categories.graphql";
import { getCategoriesInClient } from "@operations/category";
import ErrorMessage from "@components/ui/error-message";
import NotFound from "@components/common/not-found";
import cn from "classnames";
import Scrollbar from "@components/ui/scrollbar";
import * as CategoryIcons from "@components/icons/category";
import { getIcon } from "@utils/get-icon";
import ProductFeedLoaderTwo from "@components/ui/loaders/product-feed-loader-two";

const BoxCategory = () => {
  const router = useRouter();

  const { data, loading, error } = useCategoriesQuery(
    getCategoriesInClient({
      type: router.pathname === "/grocery-two" ? "grocery" : "furniture",
      limit: 100,
    })
  );

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-full h-52 flex justify-center mt-8 px-2">
          <ProductFeedLoaderTwo />
        </div>
      </div>
    );
  }
  if (error) return <ErrorMessage message={error.message} />;

  const { pathname, query } = router;
  const selectedQueries = query.category;

  const onCategoryClick = (slug: string) => {
    if (selectedQueries === slug) {
      const { category, ...rest } = query;
      router.push(
        {
          pathname,
          query: { ...rest },
        },
        {
          pathname,
          query: { ...rest },
        },
        {
          scroll: false,
        }
      );
      return;
    }
    router.push(
      {
        pathname,
        query: { ...query, category: slug },
      },
      {
        pathname,
        query: { ...query, category: slug },
      },
      {
        scroll: false,
      }
    );
  };

  return (
    <Scrollbar style={{ maxHeight: "calc(100vh - 88px)" }}>
      <div className="p-5">
        {data?.categories?.data?.length ? (
          <div className="grid grid-cols-2 gap-4">
            {data?.categories?.data.map((category, index) => (
              <div
                className={cn(
                  "text-center rounded bg-light py-4 flex flex-col items-center justify-start relative overflow-hidden cursor-pointer border-2",
                  selectedQueries === category.slug
                    ? "border-gray-800"
                    : "border-border-100 xl:border-transparent"
                )}
                role="button"
                onClick={() => onCategoryClick(category?.slug!)}
                key={index}
              >
                <div className="w-full h-20 flex items-center justify-center">
                  <span className="w-10 h-10 inline-block">
                    {getIcon({
                      iconList: CategoryIcons,
                      iconName: category?.icon!,
                      className: "w-10 h-10",
                    })}
                  </span>
                </div>

                <span className="text-sm font-semibold text-heading text-center px-2.5 block">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-full pt-6 pb-8 px-4 lg:p-8">
            <NotFound text="text-no-category" className="h-96" />
          </div>
        )}
      </div>
    </Scrollbar>
  );
};

export default BoxCategory;
