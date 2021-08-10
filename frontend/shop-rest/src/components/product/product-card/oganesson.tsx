import Image from "next/image";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import { useTranslation } from "next-i18next";

type OganessonProps = {
  product: any;
  className?: string;
};

const Oganesson: React.FC<OganessonProps> = ({ product, className }) => {
  const { t } = useTranslation("common");
  const { name, image, quantity } = product ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.sale_price,
  });

  return (
    <article
      className={cn("product-card cart-type-oganesson group h-full", className)}
    >
      <div className="rounded bg-light overflow-hidden relative flex items-center justify-center transition-shadow group-hover:shadow-sm w-auto h-48 sm:h-64">
        <span className="sr-only">{t("text-product-image")}</span>
        <Image
          src={image?.original ?? siteSettings?.product?.placeholderImage}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 start-3 md:top-4 md:start-4 rounded text-xs leading-6 font-semibold px-1.5 md:px-2 lg:px-2.5 bg-accent text-light">
            {discount}
          </div>
        )}
        <div className="absolute bottom-4 end-4">
          {quantity > 0 ? (
            <AddToCart variant="oganesson" data={product} />
          ) : (
            <div className="bg-red-500 rounded text-xs text-light px-2 py-1">
              {t("text-out-stock")}
            </div>
          )}
        </div>
      </div>
      {/* End of product image */}

      <header className="py-3.5 md:py-5 px-0.5">
        <div className="flex items-center mb-2">
          <span className="text-sm md:text-base text-heading font-semibold">
            {basePrice ? basePrice : price}
          </span>
          {discount && (
            <del className="text-xs md:text-sm text-muted ms-2">{price}</del>
          )}
        </div>
        {/* End of product price */}

        <h3 className="text-xs md:text-sm text-body truncate">{name}</h3>
        {/* End of product title */}
      </header>
    </article>
  );
};

export default Oganesson;
