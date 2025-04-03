import { BrowserRouter } from 'react-router-dom'

import 'styles/index.scss'

import { Layout } from 'components/layout'

function App() {
	return (
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	)
}

export default App
