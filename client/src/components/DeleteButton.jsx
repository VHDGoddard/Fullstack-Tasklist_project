import React from 'react'
import Icon from '../assets/claro.png'

function DeleteButton({onClick}) {
    
    return (
        <div className='flex justify-center items-center h-[20px] w-[20px] bg-red-600 border-red-500 border-2 rounded'
            onClick={onClick} 
        >
            <img className='flex justify-center items-center h-[10px] w-[10px]' src={Icon}></img>

        </div>
    )
}

export default DeleteButton