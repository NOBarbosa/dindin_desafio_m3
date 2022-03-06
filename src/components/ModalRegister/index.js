import './styles.css';
import closeIcon from '../../assets/close.svg';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';


function ModalRegister({open, setOpen, setCurrentTransaction, currentTransaction }){
  const [activeButton, setActiveButton] = useState('credit');
  const [form, setForm] = useState({
    value: 0,
    category: '',
    date: '',
    description: ''
  });

  useEffect(() =>{
    if(open && !currentTransaction){
      setForm({
        value: '',
        category: '',
        date: '',
        description: ''
      })
      return;
    }

      if(currentTransaction){
        setActiveButton(currentTransaction.type)
        setForm({
        date:format(new Date(currentTransaction.date), 'dd/mm/yyyy'),
        description:currentTransaction.description,
        value:currentTransaction.value,
        category:currentTransaction.category,
        })
      }
  }, [currentTransaction, open])

 

  function handleChange(target){
    setForm({...form, [target.name]: target.value});
  }

  async function updateTransaction(body){
    const response= await fetch(`http://localhost:3333/transactions/${currentTransaction.id}`,{
      method: 'PUT',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    
    return  response.json();
  }

  async function registerTransaction(body){
    const response =  await fetch('http://localhost:3333/transactions',{
        method: 'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      
      return  response.json();
  }

  async function handleSubmit(event){
    event.preventDefault();

    const [day, month, year] = form.date.split('/')

    const selectedDate = new Date(`${month}/${day}/${year}`);

    const body = 
      {
        date: selectedDate,
        week_day: format(selectedDate, 'eee', {
          locale: ptBR
        }),
        description: form.description,
        value: form.value,
        category: form.category,
        type: activeButton, 
      }

      if(currentTransaction){
        await updateTransaction(body);
        setOpen(false)
        return;
      }

      await  registerTransaction(body);
      setOpen(false);
   
  }

  return(
    <div className="background-modal">
      <div className='modal-content'>
        <h2>Adicionar Registro</h2>
        <img 
          onClick={() => setOpen(false)}
          className='close-icon' src={closeIcon} alt='close icon'/>

        <div className='container-btn'>
          <button className={`btn-disable ${activeButton === 'credit' && 'btn-credit'}`}
            onClick = {() => setActiveButton('credit')}
          >
            Entrada
          </button>
          <button className={`btn-disable ${activeButton === 'debit' && 'btn-debit'}`}
            onClick={() =>setActiveButton('debit')}
          >
            Saída
          </button>
        </div>

        <form  onSubmit={handleSubmit}>
          <div>
            <label>Valor</label>
            <input 
            name='value'
            onChange={(event)=>handleChange(event.target) }
            value={form.value}
            type="number"/>
          </div>
          <div>
            <label>Categoria</label>
            <input 
              name='category'
              onChange={(event)=>handleChange(event.target) }
              value={form.category}
            />
          </div>
          <div>
            <label>Data</label>
            <InputMask 
              mask="99/99/9999"
              name='date'
              onChange={(event)=>handleChange(event.target) }
              value={form.date}
            />
          </div>
          <div>
            <label>Descrição</label>
            <input 
              name='description'
              onChange={(event)=>handleChange(event.target) }
              value={form.description}
            />
          </div>
          <div className='container-btn-insert'>
            <button>
              Confirmar
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default ModalRegister;