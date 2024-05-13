import React, { useState } from 'react'

function InputData({data, setData}) {
  const handleChange = (event) => {
    let valor = event.target.value.replace(/\D/g, '');

    if (valor.length > 8) {
      valor = valor.slice(0, 8); 
    }

    valor = valor.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    setData(valor);
  };

  return (
    <div className='flex my-6 border-2 border-[#404040] w-full rounded-md'>
      <div className='flex justify-center bg-[#333533] text-white rounded-l border-r-2 border-[#404040] p-2 w-[75px]'>Data</div>
      <input className='rounded-r p-2 bg-[#242423] w-[350px] outline-none text-white' 
        type="text" 
        placeholder="dd/mm/yyyy"
        onChange={(e) => {handleChange(e)}}
        value={data}
         />
    </div>
  )
}

export default InputData