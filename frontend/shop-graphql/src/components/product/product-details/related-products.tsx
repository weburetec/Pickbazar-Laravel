import { motion } from "framer-motion";
import renderProductCard from "@components/product/render-product-card";
import cn from "classnames";
import { useTranslation } from "next-i18next";
interface Props {
  products: any;
  currentProductId: any;
  gridClassName?: string;
}

const RelatedProducts = ({
  products,
  currentProductId,
  gridClassName,
}: Props) => {
  const { t } = useTranslation("common");

  return (
    <>
      <h2 className="text-lg text-heading tracking-tight font-semibold mb-6">
        {t("text-related-products")}
      </h2>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4",
          gridClassName
        )}
      >
        {products?.map((item: any, idx: number) => {
          if (currentProductId === item.id) {
            return null;
          }
          return (
            <motion.div key={idx}>
              {renderProductCard(
                item,
                "!shadow-none border border-border-200 hover:!border-border-200 border-opacity-70"
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default RelatedProducts;
