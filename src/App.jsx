import { createBrowserRouter } from 'react-router-dom'
import { createRoutesFromElements } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import { store } from './store'
import Checkout from './pages/Checkout'
import AuthProvider from './firebase/AuthContext'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/cart" index element={<Cart />} />
        <Route path="/checkout" index element={<Checkout />} />
      </Route>
      <Route path="/login" index element={<Login />} />
    </>
  )
)

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  )
}

export default App
