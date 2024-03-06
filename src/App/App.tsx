import { RouterProvider } from 'react-router-dom'
import 'normalize.css'

import { router } from './appRouter'

function App() {
    return <RouterProvider router={router} />
}

export default App
