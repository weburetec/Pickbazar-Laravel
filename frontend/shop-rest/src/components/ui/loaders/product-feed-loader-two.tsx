import ContentLoader from "react-content-loader";

interface Props {
  limit?: number;
}

const ProductFeedLoaderTwo = ({ limit = 1 }: Props) => {
  return (
    <>
      {Array.from({ length: limit }).map((_, idx) => (
        <ContentLoader
          speed={2}
          width={360}
          height={470}
          viewBox="0 0 360 470"
          backgroundColor="#f3f3f3"
          foregroundColor="#dfdede"
          key={idx}
        >
          <rect x="5" y="5" rx="0" ry="0" width="158" height="134" />
          <rect x="187" y="4" rx="0" ry="0" width="164" height="134" />
          <rect x="4" y="160" rx="0" ry="0" width="158" height="134" />
          <rect x="186" y="159" rx="0" ry="0" width="164" height="134" />
          <rect x="4" y="316" rx="0" ry="0" width="158" height="134" />
          <rect x="186" y="315" rx="0" ry="0" width="164" height="134" />
        </ContentLoader>
      ))}
    </>
  );
};

export default ProductFeedLoaderTwo;
