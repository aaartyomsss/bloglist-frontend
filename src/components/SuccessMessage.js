import React from 'react'

const SuccessMessage = ({ text }) => {

    const style = {
        border: '3px solid green',
        borderRadius: 5,
        fontSize: 24,
        color: 'green',
        padding: 10,
        margin: 10,

    }

    return (
        <div style={style}>
            {text}
        </div>
    )
}

export default SuccessMessage