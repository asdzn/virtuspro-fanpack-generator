import IconProps from './IconProps.interface'

const Icon28LogoVkGlyph: React.FC<IconProps> = props => {
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
				d='M15.0718 21.5102C6.87191 21.5102 2.19488 15.8719 2 6.48981H6.10742C6.24233 13.376 9.27038 16.2929 11.6689 16.8943V6.48981H15.5366V12.4288C17.9051 12.1732 20.3932 9.46683 21.2327 6.48981H25.1004C24.4558 10.1585 21.7575 12.8648 19.8387 13.9774C21.7575 14.8796 24.8307 17.2401 26 21.5102H21.7425C20.8281 18.6535 18.5497 16.4433 15.5366 16.1425V21.5102H15.0718Z'
				fill='currentColor'
			/>
		</svg>
	)
}

export { Icon28LogoVkGlyph }
