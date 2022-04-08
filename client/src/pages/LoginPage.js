import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setAxiosWithCredentials } from "../utils/httpRequest";

import { login } from "../store/actions/auth.action";
import TextField from "../components/form-ui/TextField";

const INITIAL_FORM = {
    email: '',
    password: '',
};

const FORM_VALIDATION = yup.object().shape({
    email: yup.string()
        .email('Invalid email')
        .required('Required'),
    password: yup.string()
        .required("Required"),
});

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (values) => {
        setAxiosWithCredentials()
        dispatch(login(values)).then(() => navigate("/"));
    }

    return (
        <>
            <main className="container mx-auto p-4">
                <section className="max-w-md mx-auto my-8 text-center">
                    <h1 className="text-4xl font-bold font-mono mb-2">
                        Login
                    </h1>
                    <h3 className="text-lg font-semibold text-gray-500 mb-4">New User? <Link to="/signup" className="text-black hover:underline">Signup Here</Link></h3>

                    <Formik initialValues={INITIAL_FORM}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={onSubmit}>
                        <Form>
                            <div className="mb-2">
                                <TextField name="email" type="email" placeholder="Enter Email" />
                            </div>
                            <div className="mb-2">
                                <TextField name="password" type="password" placeholder="Enter Password" />
                            </div>
                            <button className="twc-button w-full mt-4" type="submit">Login</button>
                        </Form>
                    </Formik>
                </section>
            </main>
        </>
    )
}