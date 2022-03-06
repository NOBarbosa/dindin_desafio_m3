import { useEffect, useState } from 'react';
import './styles.css';

function formatValue (value){
  const valueNumber =  Number(value);
  return valueNumber.toLocaleString('pt-br',{
    style: 'currency', currency: 'BRL'
  })
}

function Resume ({transaction}){
  const [resum, setResum] = useState({
    credit: 0,
    debit: 0,
    balance: 0
  })

  useEffect(() =>{
    const sumCredit = transaction.reduce((a, item) =>{
      return item.type === 'credit' ? a + Number(item.value) : a + 0
    }, 0)
    const sumDebit = transaction.reduce((a, item) =>{
      return item.type === 'debit' ? a + Number(item.value) : a + 0
    }, 0)

    setResum({credit: sumCredit,
      debit: sumDebit,
      balance: sumCredit - sumDebit})
  }, [transaction])

  return(
    <div className="container-resume">
      <h3>Resumo</h3>
      <div>
        <span>Entradas</span>
        <strong className='in'>{formatValue(resum.credit)}</strong>
      </div>
      <div>
       <span>Saídas</span>
        <strong className='out'>{formatValue(resum.debit)}</strong>
      </div>
      <div className='hz-line'></div>
      <div>
        <span>Saldo</span>
        <strong className='balance'>{formatValue(resum.balance)}</strong>
      </div>
    </div>
  )
}

export default Resume;