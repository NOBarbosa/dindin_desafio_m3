import { useState } from 'react';
import arrowDown from '../../../assets/arrowDown.svg';
import arrowUp from '../../../assets/arrowUp.svg';
import './styles.css';


function TableHeader(){
  const [order, setOrder] = useState(true);
  const [filter, setFilter] = useState('date')

    const handleChangeFilter = (type) =>{
      if(filter === type){
        setOrder(!order);
        return;
      }
      setFilter(type)
    }
  

  return(
    <div className='table-header '>
      <div className='column-title cursor'
        onClick={() => handleChangeFilter('date')}
      >
        <span>Data</span>
        {filter === 'date' && 
        <img 
          src={order === true ? arrowUp : arrowDown} 
          alt='Arrow'/>}
       </div>
      <div className='column-title cursor'
        onClick={() => handleChangeFilter('day')}
      >
        <span>Dia da semana</span>
          {filter ==='day'&& <img src={order === true ? arrowUp : arrowDown} alt='Arrow'/>}
        </div>
      <div className='column-title'><span>Descrição</span></div>
      <div className='column-title'><span>Categoria</span></div>
      <div className='column-title cursor'
        onClick={()=> handleChangeFilter('value')}
      >
        <span>Valor</span>
        {filter ==='value' && <img src={order === true ? arrowUp : arrowDown} alt='Arrow'/>}
        </div>
      <div className='column-title'></div>
    </div >
  )
};

export default TableHeader;