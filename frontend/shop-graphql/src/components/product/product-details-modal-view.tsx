import { useProductQuery } from "@graphql/product.graphql";
import { useRouter } from "next/router";
import Image from "next/image";
import cn from "classnames";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import { useUI } from "@contexts/ui.context";
import usePrice from "@utils/use-price";
import { ThumbsCarousel } from "@components/ui/carousel";
import { getVariations } from "@utils/get-variations";
import { useState } from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { Waypoint } from "react-waypoint";
import Truncate from "@components/ui/truncate-scroll";
import dynamic from "next/dynamic";
import ProductAttributes from "./product-details/product-attributes";
import ProductCategories from "./product-details/product-categories";
import VariationPrice from "./product-details/product-variant-price";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
import { useModalAction } from "@components/ui/modal/modal.context";
const RelatedProducts = dynamic(
  () => import("./product-details/related-products")
);

const ProductDetailsModalView = ({ productSlug }: { productSlug: string }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { showModalStickyBar, hideModalStickyBar, displayModalStickyBar } =
    useUI();
  const { closeModal } = useModalAction();

  const { data, loading } = useProductQuery({
    variables: {
      slug: productSlug,
    },
  });

  const {
    id,
    name,
    slug,
    image,
    description,
    unit,
    categories,
    gallery,
    type,
    quantity,
    min_price,
    max_price,
    related_products,
    shop,
  } = data?.product ?? {};

  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  const { price, basePrice, discount } = usePrice({
    amount: data?.product?.price!,
    baseAmount: data?.product?.sale_price!,
  });

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

  const variations = getVariations(data?.product?.variations!);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;

  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = data?.product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      showModalStickyBar();
    }
  };

  if (loading || !data)
    return (
      <div className="w-96 flex justify-center items-center h-96 bg-light relative">
        <Spinner text={t("common:text-loading")} />
      </div>
    );

  return (
    <article className="bg-light w-full max-w-6xl xl:min-w-[1152px] relative z-[51]">
      {/* Sticky bar */}
      <div
        className={cn(
          "max-w-6xl h-auto w-full hidden md:block bg-light fixed top-0 start-1/2 transform -translate-x-1/2 z-50 px-8 py-6 shadow transition-all duration-300",
          {
            "invisible opacity-0 -translate-y-1/2": !displayModalStickyBar,
            "visible opacity-100 translate-y-0": displayModalStickyBar,
          }
        )}
      >
        <div className="flex items-center">
          <div
            className={cn(
              "border border-border-200 border-opacity-70 rounded relative flex items-center justify-center overflow-hidden flex-shrink-0",
              {
                "w-28 h-28": isEmpty(variations),
                "w-40 lg:w-52 h-40 lg:h-52": !isEmpty(variations),
              }
            )}
          >
            <Image
              src={image?.original! ?? "/product-placeholder.svg"}
              alt={name!}
              layout="fill"
              objectFit="contain"
              className="product-image"
            />
          </div>

          <div className="px-8 flex flex-col justify-center me-auto overflow-hidden">
            <h3
              className="font-semibold text-lg lg:text-xl tracking-tight text-heading truncate cursor-pointer transition-colors hover:text-accent"
              onClick={() => navigate(`${ROUTES.PRODUCT}/${slug}`)}
              title={name!}
            >
              {name}
            </h3>

            {unit && isEmpty(variations) ? (
              <span className="text-sm font-normal text-body mt-2 block">
                {unit}
              </span>
            ) : (
              <span className="flex items-center mt-2">
                {!isEmpty(variations) && (
                  <VariationPrice
                    selectedVariation={selectedVariation}
                    minPrice={min_price}
                    maxPrice={max_price}
                  />
                )}
              </span>
            )}
          </div>

          <div
            className={cn("w-full flex flex-shrink-0", {
              "max-w-max": isEmpty(variations),
              "max-w-[40%]": !isEmpty(variations),
            })}
          >
            {isEmpty(variations) && (
              <span className="me-8 flex items-center ">
                <ins className="text-xl lg:text-2xl font-semibold text-accent no-underline">
                  {basePrice ? basePrice : price}
                </ins>
                {discount && (
                  <del className="text-sm lg:text-base font-normal text-muted ms-2">
                    {price}
                  </del>
                )}
              </span>
            )}

            <div className="w-full">
              <div
                className={cn("flex flex-col overflow-y-auto justify-center", {
                  "h-[140px]": !isEmpty(variations),
                })}
              >
                <ProductAttributes
                  variations={variations}
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              </div>

              <div className={cn({ "mt-4": !isEmpty(variations) })}>
                {quantity! > 0 ? (
                  <AddToCart
                    data={data?.product}
                    variant="big"
                    variation={selectedVariation}
                    disabled={selectedVariation?.is_disable || !isSelected}
                  />
                ) : (
                  <div className="bg-red-500 rounded text-sm text-light px-3 py-2">
                    {t("text-out-stock")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of sticky bar */}

      {/* Main content */}
      <div className="flex w-full flex-col md:flex-row border-b border-border-200 border-opacity-70">
        <div className="md:w-1/2 p-5 md:pt-10 lg:p-14 xl:p-16">
          <div className="product-gallery h-full relative">
            {discount && (
              <div className="rounded-full text-xs leading-6 font-semibold px-3 bg-yellow-500 text-light absolute top-4 end-4 z-10">
                {discount}
              </div>
            )}

            {!!gallery?.length ? (
              <ThumbsCarousel gallery={gallery} />
            ) : (
              <div className="w-full h-[90%] flex items-center justify-center">
                <Image
                  src={image?.original ?? "/product-placeholder.svg"}
                  alt={name!}
                  width={450}
                  height={450}
                />
              </div>
            )}
          </div>
        </div>
        {/* End of product image / gallery */}

        <div className="flex justify-start md:w-1/2 p-5 md:pt-10 lg:p-14 xl:p-16">
          <Waypoint
            onLeave={showModalStickyBar}
            onEnter={hideModalStickyBar}
            onPositionChange={onWaypointPositionChange}
          >
            <div className="flex w-full flex-col items-start overflow-hidden">
              <div className="w-full">
                <h1
                  className="font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading cursor-pointer transition-colors hover:text-accent"
                  onClick={() => navigate(`${ROUTES.PRODUCT}/${slug}`)}
                  title={name!}
                >
                  {name}
                </h1>

                {unit && isEmpty(variations) && (
                  <span className="text-sm font-normal text-body mt-2 md:mt-3 block">
                    {unit}
                  </span>
                )}

                {description && (
                  <div className="mt-3 md:mt-4 text-body text-sm leading-7">
                    <Truncate character={400} hideButton={true}>
                      {description}
                    </Truncate>
                  </div>
                )}

                <div className="my-5 md:my-10 flex items-center">
                  {!isEmpty(variations) ? (
                    <VariationPrice
                      selectedVariation={selectedVariation}
                      minPrice={min_price}
                      maxPrice={max_price}
                    />
                  ) : (
                    <span className="flex items-center">
                      <ins className="text-2xl md:text-3xl font-semibold text-accent no-underline">
                        {basePrice ? basePrice : price}
                      </ins>
                      {/* use del price markup when product has discount price */}
                      {discount && (
                        <del className="text-sm md:text-base font-normal text-muted ms-2">
                          {price}
                        </del>
                      )}
                    </span>
                  )}
                </div>

                {/* end of del price markup  */}

                <div>
                  <ProductAttributes
                    variations={variations}
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                </div>

                <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center">
                  <div className="mb-3 lg:mb-0 w-full lg:max-w-[400px]">
                    <AddToCart
                      data={data?.product}
                      variant="big"
                      variation={selectedVariation}
                      disabled={selectedVariation?.is_disable || !isSelected}
                    />
                  </div>

                  {quantity! > 0 ? (
                    <>
                      {isEmpty(variations) && (
                        <span className="text-base text-body whitespace-nowrap ms-7">
                          {quantity} {t("text-pieces-available")}
                        </span>
                      )}
                      {!isEmpty(selectedVariation) && (
                        <span className="text-base text-body whitespace-nowrap ms-7">
                          {selectedVariation?.is_disable ||
                          selectedVariation.quantity === 0
                            ? t("text-out-stock")
                            : `${selectedVariation.quantity} ${t(
                                "text-pieces-available"
                              )}`}
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="text-base text-red-500 whitespace-nowrap ms-7">
                      {t("text-out-stock")}
                    </div>
                  )}
                </div>
              </div>

              {!!categories?.length && (
                <ProductCategories
                  categories={categories}
                  basePath={`/${type?.slug}`}
                  onClose={closeModal}
                />
              )}

              <div className="flex items-center mt-2">
                <span className="text-sm font-semibold text-heading capitalize me-6 py-1">
                  {t("common:text-sellers")}
                </span>

                <button
                  onClick={() => navigate(`${ROUTES.SHOPS}/${shop?.slug}`)}
                  className="text-sm text-accent tracking-wider transition underline hover:text-accent-hover hover:no-underline"
                >
                  {shop?.name}
                </button>
              </div>
            </div>
          </Waypoint>
        </div>
      </div>

      {related_products?.length! > 1 && (
        <div className="p-5 md:pb-10 lg:p-14 xl:p-16">
          <RelatedProducts products={related_products} currentProductId={id} />
        </div>
      )}
    </article>
  );
};

export default ProductDetailsModalView;
