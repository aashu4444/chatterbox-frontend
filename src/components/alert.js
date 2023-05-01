import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Alert = ({ type, cls, children }) => {

    const alertThemes = {
        warning: {
            iconColor: 'bg-red-500',
            msgColor: 'bg-red-600',
            icon: faTriangleExclamation,
        },
        success: {
            iconColor: 'bg-emerald-500',
            msgColor: 'bg-emerald-600',
            icon: faCircleCheck,
        },

    }

    const { icon, iconColor, msgColor } = alertThemes[type];

    return (
        <>
            <div className={`alert ${msgColor} ${cls}`}>

                <div className={`alert-icon ${iconColor}`}>

                    <FontAwesomeIcon icon={icon}  />
                </div>

                <p className={`msg flex-wrap`}>{children}
                </p>
            </div>
        </>
    )
}


export default Alert