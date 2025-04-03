import styles from './Layout.module.scss'

import { Toaster } from 'sonner'

import { Header, Footer } from 'components/layout'
import { AppRouter } from 'components/router'
import { Spinner } from 'components/ui'

import {
	Icon16WarningTriangle,
	Icon24ErrorCircle,
	Icon28CancelOutline,
	Icon28CheckCircleOn,
	Icon28InfoCircle,
} from '@vkontakte/icons'

const Layout = () => {
	return (
		<div className={styles.root}>
			<Header />

			<Toaster
				expand={false}
				theme='dark'
				position='top-center'
				swipeDirections={['top', 'right']}
				gap={10}
				visibleToasts={3}
				icons={{
					success: <Icon28CheckCircleOn width={28} height={28} />,
					info: <Icon28InfoCircle width={28} height={28} />,
					warning: <Icon16WarningTriangle width={28} height={28} />,
					error: <Icon24ErrorCircle width={28} height={28} />,
					loading: <Spinner width={28} height={28} />,
					close: <Icon28CancelOutline width={28} height={28} />,
				}}
				toastOptions={{
					className:
						'font-primary !text-sm border shadow-lg shadow-background rounded-sm grid grid-cols-[auto_1fr] !gap-5 !px-5 !py-5',
					classNames: {
						default: 'border-separator',
						success: '!text-positive',
						info: '!text-info',
						error: '!text-negative',
						warning: '!text-accent',
						icon: 'w-8 h-8 m-0 col-span-1',
						content: 'flex flex-col gap-1 col-start-2 items-start',
						title: 'pt-0.5',
						description: 'opacity-50 text-xs font-secondary leading-tight',
						actionButton: 'uppercase rounded-3xs col-start-2',
					},
				}}
			/>

			<main className={styles.main}>
				<AppRouter />
			</main>

			<Footer />
		</div>
	)
}

export { Layout }
