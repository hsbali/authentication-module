export default function Loader() {
    return (
    <div className='fixed top-0 left-0 z-[9999] w-full'>
        <div className="h-1 w-full bg-black relative overflow-hidden">
            <div className="animate-loader w-2/3 bg-gray-400 h-full absolute"></div>
        </div>
    </div>

    )
}