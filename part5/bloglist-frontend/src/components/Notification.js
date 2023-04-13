const Notification = ({message, color}) => {
    if (message == null || message === '') {
        return null
    }

    const notifStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    return (
        <div style={notifStyle}>{message}</div>
    );
}

export default Notification