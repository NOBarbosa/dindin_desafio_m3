import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import ModalRegister from './components/ModalRegister';
import Resume from './components/Resume';
import TableTransction from './components/TableTransactions';

function App() {
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(false);

  useEffect(() =>{
      if(currentTransaction){
        setOpen(true)
      }
  }, [currentTransaction])
  

  useEffect(() =>{
    if(!open){
      handleLoadTransaction();
    }

    if(!open && currentTransaction){
      setCurrentTransaction(false)
    }
  }, [open])

  const handleLoadTransaction =  async () =>{
   const response = await fetch(`http://localhost:3333/transactions`,{
      method: 'GET',
    });

    const data = await response.json();

    setTransaction(data);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <TableTransction 
          transaction ={transaction}
          setCurrentTransaction = {setCurrentTransaction}
          currentTransaction = {currentTransaction}
        />
        <div>
          <Resume 
            transaction={transaction}
          />
          <button 
            onClick={() => setOpen(true)}
          className='btn-insert cursor'>
            Adicionar Registro
          </button>
        </div>
      </main>
      {open  && <ModalRegister 
        open = {open}
        setOpen = {setOpen}
        setCurrentTransaction = {setCurrentTransaction}
        currentTransaction = {currentTransaction}
      />}
    </div>
  );
}

export default App;
