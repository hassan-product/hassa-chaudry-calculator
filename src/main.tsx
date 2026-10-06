import { createRoot } from 'react-dom/client'
import { Root } from './ui/App'

const container = document.getElementById('root')
if (container) createRoot(container).render(<Root />)
