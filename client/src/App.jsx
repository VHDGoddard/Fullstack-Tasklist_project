import React, {useEffect, useState} from 'react'

import InputData from './components/InputData'
import InputLembrete from './components/InputLembrete'
import SubmitButton from './components/SubmitButton'
import TodoList from './components/TodoList'

function App() {
  const [lembretes, setLembretes] = useState([]); // armazena o lembrete
  const [lembrete, setLembrete] = useState("");
  const [data, setData] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const isValidDate = (dateString) => {
    setData("")
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(dateString)) {
        alert("Formato de data inválido!");
        return false;
    }

    const [day, month, year] = dateString.split('/');
    const inputYear = parseInt(year, 10);
    const inputMonth = parseInt(month, 10);
    const inputDay = parseInt(day, 10);

    const inputDate = new Date(inputYear, inputMonth - 1, inputDay);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (
        inputDate <= currentDate ||
        inputDay !== inputDate.getDate() ||
        inputMonth !== inputDate.getMonth() + 1 ||
        inputYear !== inputDate.getFullYear()
    ) {
        alert("A data deve ser maior que a data atual e válida!");
        return false;
    }
    return true;
  };

  const handleSubmit =  (e) =>{
    e.preventDefault();

    if (!lembrete){
      setLembrete("")
      alert("Preencha o nome do lembrete")
      return;
    }

    if (!isValidDate(data)) return;

    const newLembrete = {lembrete, data}

    fetch("http://localhost:8080/api/save_lembrete", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newLembrete)
      }).then(
        response => response.json()
      ).then(
        data => {
        setLembretes(data);
        setIsUpdated(false);
      }
    );
  };
  
  useEffect(() => {
    if (isUpdated === false) {
      fetch("http://localhost:8080/api/get_lembretes")
        .then(response => response.json())
        .then(data => {
          const sortedLembretes = Object.entries(data)
            .sort(([dateA], [dateB]) => {
              const dateObjectA = new Date(dateA);
              const dateObjectB = new Date(dateB);
              
              return dateObjectA - dateObjectB;
            })
            .reduce((acc,[date,lembretes]) => {
              acc[date] = lembretes;

              return acc;
            }, {});
  
          setLembretes(sortedLembretes);
          setLembrete("");
          setData("");
          setIsUpdated(true);
        })
        .catch(error => {
          console.error("Erro ao obter lembretes:", error);
        });
    }
  }, [isUpdated]);

  return (
    <div className=' h-[100vh] w-[100vw] bg-[#242423] py-2 px-3'>
      <h1 className='text-2xl text-white'>Novo lembrete</h1>
      <div className='h-fit w-[425px] mb-6'>
        <InputLembrete lembrete={lembrete} setLembrete={setLembrete} />
        <InputData data={data} setData={setData} />
        <div className='w-full flex justify-end'>
          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>
      <h1 className='text-2xl text-white'>Lista de lembretes</h1>
      <div className='h-fit w-[425px] pl-[50px]'>
        <TodoList lembretes={lembretes} setLembretes={setLembretes} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
      </div>
    </div>
  )
}

export default App