import { Route, Routes } from 'react-router-dom'
import Login from 'screens/Login'
import Home from 'screens/Home'

function Router() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default Router