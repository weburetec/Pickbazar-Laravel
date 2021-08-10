import ContentLoader from 'react-content-loader';

const VerifyCheckoutLoader = (props: any) => (
	<ContentLoader
		speed={2}
		width={'100%'}
		height={'auto'}
		viewBox="0 0 320 282"
		backgroundColor="#e0e0e0"
		foregroundColor="#cecece"
		{...props}
	>
		<rect x="30%" y="0" width="40%" height="18" />
		<rect x="0" y="75" width="150" height="10" />
		<rect x="260" y="75" width="60" height="10" />
		<rect x="0" y="115" width="100%" height="1" />
		<rect x="0" y="145" width="80" height="10" />
		<rect x="260" y="145" width="60" height="10" />
		<rect x="0" y="175" width="60" height="10" />
		<rect x="160" y="175" width="160" height="10" />
		<rect x="0" y="205" width="100" height="10" />
		<rect x="190" y="205" width="130" height="10" />
		<rect x="0" y="238" rx="6" ry="6" width="100%" height="44" />
	</ContentLoader>
);

export default VerifyCheckoutLoader;
