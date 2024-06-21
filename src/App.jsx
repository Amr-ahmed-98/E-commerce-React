import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Notfound from './Pages/Notfound/Notfound';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import AuthContextProvider from './Context/AuthContext';
import Home from './Pages/Home/Home';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import Cart from './Pages/Cart/Cart';
import PayCash from './Pages/PayCash/PayCash';
import PayOnline from './Pages/PayOnline/PayOnline';
import AllOrders from './Pages/AllOrders/AllOrders';
import SearchForProduct from './Pages/SearchForProduct/SearchForProduct';
import Categories from './Pages/Categories/Categories';
import Brands from './Pages/Brands/Brands';
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/Cart',
          element: <Cart/>,
        },
        {
          path: '/products',
          element: <SearchForProduct/>,
        },
        {
          path: '/categories',
          element: <Categories />,
        },
        {
          path: '/brands',
          element:<Brands/>,
        },
        {
          path: '/ForgetPassword',
          element: <ForgetPassword />,
        },
        {
          path: '/:id',
          element: <ProductDetails />,
        },
        {
          path: '/PayCash',
          element: <PayCash />,
        },
        {
          path: '/PayOnline',
          element: <PayOnline />,
        },
        {
          path: '/allorders',
          element: <AllOrders />,
        },
        {
          path: '*',
          element: <Notfound />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
        </CartContextProvider>
        {/* <ReactQueryDevtools initialIsOpen ={false}/> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
