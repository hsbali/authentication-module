import { useEffect, useState } from "react";
import { useField, useFormikContext, Field } from "formik";

export default function TextField({ name, label, maxWidth, ...otherProps }) {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const [error, setError] = useState(null)

    useEffect(() => {
        // console.log(meta)
        // console.log(field)
        if (meta && meta.touched && meta.error) {
            setError(meta.error)
        } else {
            setError(null)
        }
    }, [meta])


    return (
        <>
            <div className='flex flex-col items-start'>
                {label ? (
                    <label className='mx-2 font-semibold text-gray-600'>{label}</label>
                ) : ""}
                <Field name={name} className="py-1.5 px-3 w-full border border-gray-400 rounded-lg outline-none focus:border-black" {...otherProps} />
                <p className="text-sm text-red-500 mx-2">{error}</p>
            </div>
        </>
    )
}