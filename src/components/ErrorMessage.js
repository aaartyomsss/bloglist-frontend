import React from 'react'

const ErrorMessage = ({ text }) => {
    const style = {
        border: '3px solid red',
        borderRadius: 5,
        fontSize: 24,
        color: 'red',
        padding: 10,
        margin: 10,

    }

    return (
        <div style={style}>
            {text}
        </div>
    )
}

export default ErrorMessage