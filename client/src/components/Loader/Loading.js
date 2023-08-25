
function Loader({text, isImageUpload}) {
    return (
        <>
        {!isImageUpload && 
            <div className="flex flex-col items-center justify-center">
                <img src="/img/loader.gif" className="w-16"/>
                <span className="text-sm mt-3">{text}</span>
            </div>
        }

        {isImageUpload &&
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-10" style={{backgroundColor : 'rgba(255,255,255,0.5)'}}>
                <img src="/img/loader.gif" className="w-16"/>
                <span className="text-sm mt-3">{text}</span>
            </div>
        }
        </>
    )
}

export default Loader;