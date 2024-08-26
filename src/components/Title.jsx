export const Title=({title,children})=>{
    return(
        <div className="main__title">
            <div className="left__title">
                <h1>{title}</h1>
            </div>
            <div className="right__title">
                {children}
            </div>
        </div>
    )
}