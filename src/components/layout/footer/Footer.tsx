import React from 'react'

const Footer: React.FC = () => {
	return (
		<footer className='h-16 mt-auto'>
			<div className='container mx-auto w-full h-full px-6 flex items-center justify-center'>
				<span className='font-medium text-base text-ewc-black/50'>
					&copy; 2003 — {new Date().getFullYear()}{' '}
					<a
						href='https://virtus.pro'
						className='underline'
						target='_blank'
						rel='noopener noreferrer'
					>
						VIRTUS.PRO
					</a>
				</span>
			</div>
		</footer>
	)
}

export { Footer }
