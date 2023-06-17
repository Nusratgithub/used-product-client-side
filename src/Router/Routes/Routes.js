import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layout/DashboardLayout';
import MainLayout from '../../Layout/MainLayout';
import Blog from '../../Pages/Blog/Blog';
import ErrorPage from '../../Pages/ErrorPage/ErrorPage';
import Home from '../../Pages/Homes/Home/Home';
import Login from '../../Pages/Homes/Login/Login';
import Signup from '../../Pages/Homes/SignUP/SignUp';
import Products from '../../Pages/Products/Products';
import Orders from '../../Pages/Dashboard/Orders/orders';
import PrivateRoute from './PrivateRoute';
import ContactUs from '../../Pages/Contact/Contact';
import Category from '../../Pages/Homes/Category/Category';
import Payment from '../../Pages/Dashboard/Payment/Payment';
import AddProduct from '../../Pages/Dashboard/AddProduct/AddProduct';
import MyProduct from '../../Pages/Dashboard/MyProduct/MyProduct';
import ReportedProduct from '../../Pages/Dashboard/ReportedProduct/ReportedProduct';
import AllSellers from '../../Pages/Dashboard/AllSeller/AllSeller';
import AllBuyer from '../../Pages/Dashboard/AllBuyer/AllBuyer';
import AdminRoute from './AdminRoute';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import AddCategory from '../../Pages/Dashboard/AddCategory/AddCategory';
import AllCategory from '../../Pages/Dashboard/AllCategory/AllCategory';
import AllUsers from '../../Pages/Dashboard/AllUsers/AllUsers';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/products',
        element: <PrivateRoute><Products></Products></PrivateRoute>
      },
      {
        path: '/category/:id',
        element: (<PrivateRoute><Category /></PrivateRoute>),
        loader: ({ params }) => fetch(`https://b612-used-products-resale-server-side-blush.vercel.app/category/${params.id}`)
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      },
      {
        path: '/contact',
        element: <ContactUs></ContactUs>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Signup></Signup>
      }



    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/orders',
        element: <Orders></Orders>
      },
      {
        path: '/dashboard/addProduct',
        element: <AddProduct></AddProduct>

      },
      {
        path: '/dashboard/myProduct',
        element: <MyProduct></MyProduct>

      },
      {
        path: '/dashboard/all-buyer',
        element: <AdminRoute><AllBuyer /></AdminRoute>

      },
      {
        path: '/dashboard/all-seller',
        element: <AdminRoute><AllSellers /></AdminRoute>
      },
      {
        path: '/dashboard/all-user',
        element: <AdminRoute><AllUsers /></AdminRoute>
      },
      {
        path: '/dashboard/reportedProduct',
        element: <ReportedProduct />

      },
      {
        path: '/dashboard/all-category',
        element: <AllCategory />

      },
      {
        path: '/dashboard/add-category',
        element: <AddCategory />

      },
      {
        path: '/dashboard/payment/:id',
        element: <Payment></Payment>,
        loader: ({ params }) => fetch(`https://b612-used-products-resale-server-side-blush.vercel.app/orders/${params.id}`)
      }

    ]
  }



])
export default router;