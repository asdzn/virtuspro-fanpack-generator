import React from 'react'

const Header: React.FC = () => {
	return (
		<header className='@container/header'>
			<div className='container mx-auto w-full h-22 @md:h-28 px-6 flex items-end justify-center'>
				<img
					className='flex max-w-68 @md:max-w-xs'
					src='/images/vp-x-ewc.svg'
					alt='VP x EWC'
				/>
			</div>
		</header>
	)
}

export { Header }
