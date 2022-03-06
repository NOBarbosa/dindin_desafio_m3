import { format } from 'date-fns';
import { useState } from 'react';
import editIcon from '../../assets/pen.svg';
import deleteIcon from '../../assets/trash.svg';
import ModalDelete from '../ModalDelete';
import './styles.css';
import TableHeader from './TableHeader';


function formatValue (value){
  const valueNumber =  Number(value);
  return valueNumber.toLocaleString('pt-br',{
    style: 'currency', currency: 'BRL'
  })
}

function TableTransction({transaction,  setCurrentTransaction}){
  const [idItem, setIdItem] = useState(null)

  const handleDelete = async () =>{
    const response = await fetch(`http://localhost:3333/transactions/${idItem}`, {
      method: 'DELETE',
    })

    setIdItem(null);
    
  }
  
  function formatDate(date){
    const createDate = new Date(date)
    return format(createDate, 'dd/mm/yyyy')
  }

  return(
    <div className='table'>
      <TableHeader />
      <div className='table-body'>
        {transaction.map((item) =>{
          return(
            <div className='table-line' key={item.id}>
              <div className='line-item'>{formatDate(item.date)}</div>  
              <div className='line-item'>{item.week_day}</div>  
              <div className='line-item'>{item.description}</div>  
              <div className='line-item'>{item.category}</div>  
              <div className='line-item'
                style={{color: item.type === 'credit' ? '#7B61FF' : "#FA8C10"}}
              >{formatValue(item.value)}</div>  
              <div className='line-item'>
                <img 
                  src={editIcon} alt='icon'
                  className='action-btn'
                  onClick={() =>{setCurrentTransaction(item)}}
                />
                <img 
                  onClick={() =>{setIdItem(item.id)}}
                  src={deleteIcon} alt='icon'
                  className='action-btn'
                />
              </div>
              <ModalDelete 
                isOpen={item.id === idItem }
                setIsOpen={() => {setIdItem(null)}}
                handleConfirm = {() => handleDelete()}
              />
          </div>
          )
        })}
          
      </div>
    </div>
  )
};

export default TableTransction;