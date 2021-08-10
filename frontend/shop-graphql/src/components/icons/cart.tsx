import React, { FC } from 'react';

type CartProps = {
	width?: number;
	height?: number;
	className?: string;
};

const Cart: FC<CartProps> = ({ width, height, className }) => {
	return (
		<svg
			width={width}
			height={height}
			className={className}
			viewBox="0 0 14.4 12"
		>
			<g transform="translate(-288 -413.89)">
				<path
					fill="currentColor"
					d="M298.7,418.289l-2.906-4.148a.835.835,0,0,0-.528-.251.607.607,0,0,0-.529.251l-2.905,4.148h-3.17a.609.609,0,0,0-.661.625v.191l1.651,5.84a1.336,1.336,0,0,0,1.255.945h8.588a1.261,1.261,0,0,0,1.254-.945l1.651-5.84v-.191a.609.609,0,0,0-.661-.625Zm-5.419,0,1.984-2.767,1.98,2.767Zm1.984,5.024a1.258,1.258,0,1,1,1.319-1.258,1.3,1.3,0,0,1-1.319,1.258Zm0,0"
				/>
			</g>
		</svg>
	);
};

export default Cart;
