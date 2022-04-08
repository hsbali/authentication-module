import { useDispatch, useSelector } from "react-redux"
import useWindowSize from "../hooks/useWindowSize";
import Confetti from 'react-confetti'
import { Link } from "react-router-dom";

import { logout } from "../store/actions/auth.action";

export default function HomePage() {
    const dispatch = useDispatch()
    const { width, height } = useWindowSize();

    const userAuthState = useSelector((state) => state.auth.isAuthenticated)
    const userData = useSelector((state) => state.auth.user);

    return (
        <>
            {userAuthState && <Confetti
                width={width}
                height={height}
                numberOfPieces={700}
                recycle={false}
                friction={1.01}
            />}

            <main className="container mx-auto p-4">
                <section className="my-8 text-center">

                    <h1 className="text-4xl font-bold font-mono mb-4">Hello {userData ? userData.fName : "Guest"}</h1>
                    {userData ? (
                        <>
                            <p className="text-lg font-semibold font-mono mb-4 ">Your are an Authenticated User.</p>
                            <button onClick={() => dispatch(logout())} className="twc-button w-28">Logout</button>
                        </>
                    ) : (
                        <>
                            <p className="text-lg font-semibold font-mono mb-4">Your are a Guest User. Please Login or Signup to Authenticate.</p>
                            <div className="flex gap-4 items-center justify-center">
                                <Link to="/login" className="twc-button w-28">Login</Link>
                                <Link to="/signup" className="twc-button w-28">Signup</Link>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </>
    )
}