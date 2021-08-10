import React, { FC } from 'react';

type CheckProps = {
	width?: number;
	height?: number;
	className?: string;
};

const Check: FC<CheckProps> = ({ width = 24, height = 24, className }) => {
	return (
		<svg
			width={width}
			height={height}
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
		>
			<path
				d="M20 6L9 17L4 12"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Check;
