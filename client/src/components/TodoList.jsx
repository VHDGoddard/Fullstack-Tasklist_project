import React, { useEffect } from 'react';
import DeleteButton from './DeleteButton.jsx';

function TodoList({ lembretes, setLembretes, isUpdated, setIsUpdated }) {

  
  const handleDelete = (date, id) => {
    fetch(`http://localhost:8080/api/delete_lembrete/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        const updatedLembretes = { ...lembretes };
        updatedLembretes[date] = updatedLembretes[date].filter(item => item.id !== id);
        if (updatedLembretes[date].length === 0) {
          delete updatedLembretes[date];
        }
        setLembretes(updatedLembretes);
        setIsUpdated(false); 
      } else {
        throw new Error('Erro ao excluir lembrete');
      }
    })
    .catch(error => alert(error));
  };

  
  useEffect(() => {
    if (!isUpdated) {
      fetch("http://localhost:8080/api/get_lembretes")
        .then(response => response.json())
        .then(data => {
          
          setLembretes(data);
          setIsUpdated(true); 
        })
        .catch(error => {
          console.error("Erro ao obter lembretes:", error);
        });
    }
  }, [lembretes, isUpdated, setLembretes, setIsUpdated]);

  return (
    <div className='p-2'>
      {
        Object.entries(lembretes).map(([data, lembreteArray]) => (
          <div key={data}>
            <h2 className='font-bold mb-2'>{data}</h2>
            {
              lembreteArray.map(({ lembrete, id }) => (
                <div className='flex items-center mb-2' key={id}>
                  <h3 className='pl-[50px] px-2 w-fit h-fit'>{lembrete}</h3>
                  <DeleteButton onClick={() => handleDelete(data, id)} />
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default TodoList;