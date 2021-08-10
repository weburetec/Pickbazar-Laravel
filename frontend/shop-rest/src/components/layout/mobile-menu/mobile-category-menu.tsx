import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import SidebarMenu from "@components/ui/sidebar-menu";
import Scrollbar from "@components/ui/scrollbar";
import CategoryListLoader from "@components/ui/loaders/category-loader";
import SidebarWrapper from "@components/common/sidebar/sidebar-wrapper";
import NotFound from "@components/common/not-found";
import { useCategoriesQuery } from "@data/category/use-categories.query";

export default function MobileCategoryMenu() {
  const { query } = useRouter();
  const { type } = query;
  const {
    isLoading: loading,
    data,
    error,
  } = useCategoriesQuery({
    type: type as string,
  });

  if (loading) {
    return (
      <div>
        <div className="w-72 mt-8 px-2">
          <CategoryListLoader />
        </div>
      </div>
    );
  }
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <SidebarWrapper>
      <div className="h-full max-h-full overflow-hidden">
        <Scrollbar className="w-full h-full max-h-screen">
          {data?.categories?.data?.length ? (
            <SidebarMenu items={data?.categories?.data} className="py-3 px-6" />
          ) : (
            <div className="min-h-full pt-6 pb-8 px-4 lg:p-8">
              <NotFound text="text-not-found" className="h-96" />
            </div>
          )}
        </Scrollbar>
      </div>
    </SidebarWrapper>
  );
}
