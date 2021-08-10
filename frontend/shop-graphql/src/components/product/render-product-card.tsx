import dynamic from "next/dynamic";
const Helium = dynamic(() => import("@components/product/product-card/helium"));
const Neon = dynamic(() => import("@components/product/product-card/neon"));
const Argon = dynamic(() => import("@components/product/product-card/argon"));
const Krypton = dynamic(
  () => import("@components/product/product-card/krypton")
);
const Xenon = dynamic(() => import("@components/product/product-card/xenon"));

export default function renderProductCard(product: any, className = "") {
  switch (product?.type?.slug) {
    case "grocery":
      return <Neon product={product} className={className} />;
    case "bakery":
      return <Argon product={product} className={className} />;
    case "clothing":
      return <Xenon product={product} className={className} />;
    case "furniture":
      return <Krypton product={product} className={className} />;
    default:
      return <Helium product={product} className={className} />;
  }
}
