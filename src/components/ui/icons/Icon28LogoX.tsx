import IconProps from './IconProps.interface'

const Icon28LogoX: React.FC<IconProps> = props => {
	const { width, height, className } = props

	const style = { width: width ? width : 28, height: height ? height : 28 }

	return (
		<svg
			style={style}
			className={className}
			viewBox='0 0 28 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M20.3815 4.14624H23.7537L16.3496 12.5096L25 23.8546H18.2116L12.8967 16.9603L6.81206 23.8546H3.43985L11.2839 14.9095L3 4.14624H9.95701L14.7587 10.4442L20.3815 4.14624ZM19.2013 21.891H21.0706L8.97467 6.03708H6.96601L19.2013 21.891Z'
				fill='currentColor'
			/>
		</svg>
	)
}

export { Icon28LogoX }
