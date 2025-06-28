import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
// ... other imports

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* other routes */}
    </Routes>
  )
}
