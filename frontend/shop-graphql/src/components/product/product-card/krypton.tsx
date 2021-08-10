import React, { FC } from "react";
import Link from "@components/ui/link";
import Image from "next/image";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";

type KryptonProps = {
  product: any;
  className?: string;
};

const Krypton: FC<KryptonProps> = ({ product, className }) => {
  const { t } = useTranslation("common");
  const { name, slug, image } = product ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.sale_price,
  });

  return (
    <Link href={`${ROUTES.PRODUCT}/${slug}`}>
      <article
        className={cn(
          "product-card cart-type-krypton rounded h-full bg-light overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-sm",
          className
        )}
      >
        <div className="relative flex items-center justify-center w-auto h-48 sm:h-64">
          <span className="sr-only">{t("text-product-image")}</span>
          <Image
            src={image?.original ?? siteSettings?.product?.placeholderImage}
            alt={name}
            layout="fill"
            objectFit="contain"
            className="product-image"
          />
          {discount && (
            <div className="absolute top-3 end-3 md:top-4 md:end-4 rounded-full text-xs leading-6 font-semibold px-2 md:px-2.5 bg-yellow-500 text-light">
              {discount}
            </div>
          )}
        </div>
        {/* End of product image */}

        <header className="p-3 md:p-6 text-center">
          <h3 className="text-sm text-heading font-semibold truncate mb-2">
            {name}
          </h3>
          {/* End of product title */}

          <div className="flex items-center justify-center">
            <span className="text-sm text-sub-heading">
              {basePrice ? basePrice : price}
            </span>
            {discount && <del className="text-sm text-muted ms-2">{price}</del>}
          </div>
        </header>
      </article>
    </Link>
  );
};

export default Krypton;
