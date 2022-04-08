import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

// project imports
import Loadable from '../components/Loadable';

import AuthProvider from '../components/AuthProvider';
const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
const SignupPage = Loadable(lazy(() => import('../pages/SignupPage')));

const DefaultRoutes = {
    path: '',
    element: <AuthProvider><Outlet /></AuthProvider>,
    children: [
        {
            path: '',
            element: <HomePage />
        },
        {
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'signup',
            element: <SignupPage />
        },
    ]
};

export default DefaultRoutes;
