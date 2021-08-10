import { useRouter } from "next/router";
import { useCategoriesQuery } from "@graphql/categories.graphql";
import { getCategoriesInClient } from "@operations/category";
import ErrorMessage from "@components/ui/error-message";
import NotFound from "@components/common/not-found";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import cn from "classnames";
import { ArrowNextIcon } from "@components/icons/arrow-next";
import { ArrowPrevIcon } from "@components/icons/arrow-prev";
import BakeryCategoryLoader from "@components/ui/loaders/bakery-category-loader";
import { useTranslation } from "next-i18next";

SwiperCore.use([Navigation]);

const BakeryCategory = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { data, loading, error } = useCategoriesQuery(
    getCategoriesInClient({ type: "bakery", limit: 100 })
  );

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-full h-52 flex justify-center mt-8 px-2">
          <BakeryCategoryLoader />
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

  const breakpoints = {
    320: {
      slidesPerView: 2,
    },

    440: {
      slidesPerView: 3,
    },

    620: {
      slidesPerView: 4,
    },

    820: {
      slidesPerView: 5,
    },

    1100: {
      slidesPerView: 6,
    },

    1280: {
      slidesPerView: 7,
    },
  };

  return (
    <div className="w-full bg-gray-100">
      {data?.categories?.data?.length ? (
        <div className="pt-5 px-4 lg:p-8 lg:pb-0">
          <div className="relative">
            <Swiper
              id="category-card-menu"
              navigation={{
                nextEl: ".banner-slider-next",
                prevEl: ".banner-slider-prev",
              }}
              breakpoints={breakpoints}
              slidesPerView={7}
              spaceBetween={10}
            >
              {data?.categories?.data.map((category, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className={cn(
                      "text-center rounded bg-light relative overflow-hidden cursor-pointer border-2",
                      selectedQueries === category.slug
                        ? "border-accent"
                        : "border-light"
                    )}
                    role="button"
                    onClick={() => onCategoryClick(category?.slug!)}
                  >
                    <div className="flex items-center justify-center h-32 w-full relative overflow-hidden mb-3">
                      <img
                        src={category?.image?.original!}
                        alt={category?.name!}
                        className="w-auto h-auto max-w-full max-h-full"
                      />
                    </div>
                    <span className="text-sm font-semibold text-heading text-center px-4 pb-4 block">
                      {category.name}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="banner-slider-prev w-8 h-8 flex items-center justify-center text-heading bg-light shadow-300 outline-none rounded-full absolute top-1/2 -mt-4 z-10 cursor-pointer -start-4 focus:outline-none">
              <span className="sr-only">{t("text-previous")}</span>
              <ArrowPrevIcon />
            </button>
            <button className="banner-slider-next w-8 h-8 flex items-center justify-center text-heading bg-light shadow-300 outline-none rounded-full absolute top-1/2 -mt-4 z-10 cursor-pointer -end-4 focus:outline-none">
              <span className="sr-only">{t("text-next")}</span>
              <ArrowNextIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-full pt-6 pb-8 px-4 lg:p-8">
          <NotFound text="text-no-category" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default BakeryCategory;
