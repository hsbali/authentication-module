import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { signin } from "../store/actions/auth.action";
import TextField from "../components/form-ui/TextField";

const INITIAL_FORM = {
    fName: '',
    lName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const FORM_VALIDATION = yup.object().shape({
    fName: yup.string()
        .required('Required'),
    lName: yup.string()
        .required('Required'),
    email: yup.string()
        .email('Invalid email')
        .required('Required'),
    password: yup.string()
        .min(8, 'Must 8 to 20 characters')
        .max(20, 'Must 8 to 20 characters').required('Required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match').required("Required")
});

export default function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (values) => {
        // return console.log(values)
        dispatch(signin(values)).then(() => navigate("/"));
    }

    return (
        <>
            <main className="container mx-auto p-4">
                <section className="max-w-md mx-auto my-8 text-center">
                    <h1 className="text-4xl font-bold font-mono mb-2">
                        Signup
                    </h1>
                    <h3 className="text-lg font-semibold text-gray-500 mb-4">Already a User? <Link to="/login" className="text-black hover:underline">Login Here</Link></h3>
                    <Formik initialValues={INITIAL_FORM}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={onSubmit}>
                        <Form>
                            <div className="mb-2">
                                <TextField name="fName" type="text" placeholder="Enter First Name" />
                            </div>
                            <div className="mb-2">
                                <TextField name="lName" type="text" placeholder="Enter Last Name" />
                            </div>
                            <div className="mb-2">
                                <TextField name="email" type="email" placeholder="Enter Email" />
                            </div>
                            <div className="mb-2">
                                <TextField name="password" type="password" placeholder="Enter Password" />
                            </div>
                            <div className="mb-2">
                                <TextField name="confirmPassword" type="password" placeholder="Confirm Password" />
                            </div>
                            <button className="twc-button w-full mt-4" type="submit">Signup</button>
                        </Form>
                    </Formik>
                </section>
            </main>
        </>
    )
}