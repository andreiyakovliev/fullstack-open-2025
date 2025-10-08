const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    const className = type === "succes" ? "successMessage" : "errorMessage"

    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification