import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setAxiosWithCredentials } from '../utils/httpRequest';

import { loadUser, refreshAuth } from '../store/actions/auth.action';

import Loader from './Loader';

export default function AuthProvider({ children }) {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading ] = useState(true)

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const toRefresh = useSelector((state) => state.auth.toRefresh);

    useEffect(() => {
        setAxiosWithCredentials();

        if (toRefresh) {
            setIsLoading(true);
            dispatch(refreshAuth())
                .then(() => dispatch(loadUser()))
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
        }

        const refresher = setInterval(function () {
            if (toRefresh) dispatch(refreshAuth());
        }, 17 * 60 * 1000); // 18 * 60 * 1000

        return () => {
            clearInterval(refresher);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toRefresh, isAuthenticated]);

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            {children}
        </>
    )
}