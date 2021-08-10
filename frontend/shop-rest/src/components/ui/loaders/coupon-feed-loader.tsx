import CouponCardLoader from '@components/ui/loaders/coupon-card-loader';

interface Props {
	limit?: number;
}

const CouponFeedLoader = ({ limit = 3 }: Props) => {
	return (
		<>
			{Array.from({ length: limit }).map((_, idx) => (
				<CouponCardLoader key={idx} uniqueKey={idx} />
			))}
		</>
	);
};

export default CouponFeedLoader;
