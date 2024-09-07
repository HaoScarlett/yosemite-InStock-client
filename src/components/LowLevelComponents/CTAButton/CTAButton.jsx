import React from 'react'
import './CTAButton.scss'

function CTAButton({ variant = 'primary', onClick, text }) {
    const getBtnStyle = () => {
        switch (variant) {
            case 'primary':
                return 'btn-primary'
            case 'secondary':
                return 'btn-secondary';
            case 'delete':
                return 'btn-delete';
            default:
                return 'btn-primary';
        }
    }

    return (
        <button className={getBtnStyle()} onClick={onClick} >{text}</button>
    )
}

/* Use example
<CTAButton text={'+ Add item'}/>
<CTAButton text={'+ Add item'} variant='secondary' />
<CTAButton text={'Delete'} variant='delete' /> */

export default CTAButton
