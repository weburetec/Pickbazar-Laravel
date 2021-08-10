import { useRouter } from "next/router";
import { useCategoriesQuery } from "@graphql/categories.graphql";
import { getCategoriesInClient } from "@operations/category";
import ErrorMessage from "@components/ui/error-message";
import SidebarMenu from "@components/ui/sidebar-menu";
import Scrollbar from "@components/ui/scrollbar";
import CategoryListLoader from "@components/ui/loaders/category-loader";
import NotFound from "@components/common/not-found";

const CategoryDropdownSidebar = () => {
  const { query } = useRouter();
  const { type } = query;
  const { data, loading, error } = useCategoriesQuery(
    getCategoriesInClient({ type: type as string, limit: 100 })
  );

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoryListLoader />
        </div>
      </div>
    );
  }
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <aside className="sticky top-22 h-full lg:w-72 hidden xl:block bg-light">
      <div className="max-h-full overflow-hidden">
        <Scrollbar className="w-full h-full max-h-screen">
          {data?.categories?.data?.length ? (
            <div className="px-5">
              <SidebarMenu items={data?.categories?.data} className="py-8" />
            </div>
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
              <NotFound text="text-no-category" className="h-96" />
            </div>
          )}
        </Scrollbar>
      </div>
    </aside>
  );
};

export default CategoryDropdownSidebar;
