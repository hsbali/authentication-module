import { useSelector} from "react-redux";

const COLOR_TO_TYPE = {
    success: 'bg-green-500',
    warning: 'bg-yellow-600',
    error: 'bg-red-500',
    info: 'bg-blue-500',
}

export default function AlertContainer() {
    const alertState = useSelector((state) => state.alert)

    return (
        <>
            <div className="fixed z-[100] flex flex-col gap-2 w-[300px] right-4 top-4">

            {alertState.length !== 0 && alertState.map((alert) => {
                return (
                    // <Alert key={alert.id} variant="filled" severity={alert.type} onClose={() => dispatch(removeAlert(alert.id))}>
                    //     {alert.msg}
                    // </Alert>
                    <div key={alert.id} className={`py-2 px-3 text-white rounded-lg ${COLOR_TO_TYPE[alert.type]}`}>{alert.msg}</div>
                )
            })}
            </div>
        </>
    )
}