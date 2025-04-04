import { Navigate, Route, Routes } from 'react-router'

import { Home } from 'views'

export const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />

			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	)
}
