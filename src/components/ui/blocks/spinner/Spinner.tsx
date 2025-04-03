import { twMerge } from 'tailwind-merge'

import SpinnerProps from './Spinner.interface'

import { Icon24Spinner } from '@vkontakte/icons'

const Spinner: React.FC<SpinnerProps> = props => {
	const { width, height, className, ...restProps } = props

	return (
		<div {...restProps} className={twMerge('max-w-content', className)}>
			<Icon24Spinner width={width} height={height} className='animate-spin' />
		</div>
	)
}

export { Spinner }
