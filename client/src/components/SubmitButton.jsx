import React from 'react'

function button({onClick}) {
  return (
    <button className='rounded-md px-6 py-3 bg-blue-500 text-md text-white font-bold border-2 border-blue-400 mr-0'
            onClick={onClick}
    >
      Criar
    </button>
  )
}

export default button