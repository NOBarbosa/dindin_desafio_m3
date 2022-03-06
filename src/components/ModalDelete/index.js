import './styles.css';

function ModalDelete({isOpen, setIsOpen, handleConfirm }){
    return(
        <>
            {isOpen && 
            <div className='container-delete'>
                <span>Apagar Item?</span>
                <div className='container-btn'>
                    <button 
                    className='btn-confirm yes'
                    onClick={() => handleConfirm()}>
                        Sim
                    </button>
                    <button 
                    className='btn-confirm no'
                    onClick={() => setIsOpen(false)}>
                        Não
                    </button>
                </div>
            </div>}
        </>
    )
}

export default ModalDelete