import usePrice from "@utils/use-price";
import isEmpty from "lodash/isEmpty";

export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
}: any) {
  const { price, basePrice, discount } = usePrice(
    selectedVariation && {
      amount: selectedVariation.price,
      baseAmount: selectedVariation.sale_price,
    }
  );
  const { price: min_price } = usePrice({
    amount: minPrice,
  });
  const { price: max_price } = usePrice({
    amount: maxPrice,
  });
  return (
    <span className="flex items-center">
      <ins className="text-2xl md:text-3xl font-semibold text-accent no-underline">
        {!isEmpty(selectedVariation)
          ? `${basePrice ? basePrice : price}`
          : `${min_price} - ${max_price}`}
      </ins>
      {discount && (
        <del className="text-sm md:text-base font-normal text-muted ms-2">
          {price}
        </del>
      )}
    </span>
  );
}
