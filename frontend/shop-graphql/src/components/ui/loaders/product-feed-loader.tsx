import ProductCardLoader from '@components/ui/loaders/product-card-loader';

interface Props {
	limit?: number;
}

const ProductFeedLoader = ({ limit = 3 }: Props) => {
	return (
		<>
			{Array.from({ length: limit }).map((_, idx) => (
				<ProductCardLoader key={idx} uniqueKey={idx} />
			))}
		</>
	);
};

export default ProductFeedLoader;
