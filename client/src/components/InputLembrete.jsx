import React, { useState } from 'react'

function InputLembrete({lembrete, setLembrete}) {
  return (
    <div className='flex my-6 border-2 border-[#404040] w-full rounded-md'>
      <div className='flex justify-center bg-[#333533] text-white rounded-l border-r-2 border-[#404040] p-2 w-[75px]'>Tarefa</div>
      <input className='rounded-r p-2 bg-[#242423] w-[350px] outline-none text-white' 
        type="text" 
        placeholder="Lembrete"
        onChange={(e) => {setLembrete(e.target.value)}}
        value={lembrete}
         />
    </div>
  )
}

export default InputLembrete