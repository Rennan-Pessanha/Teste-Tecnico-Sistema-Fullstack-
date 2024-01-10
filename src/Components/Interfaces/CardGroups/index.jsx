import React from 'react';

const CardGroup = ({ title, notas, onOpenModal, onZeroNota }) => {
  
  return (
    <div>
      <div className="group-header">
        <h1 className='Title'>{title}</h1>
        <button className="launch-button" onClick={() => onOpenModal(title)}>
          <h2 className='NoteText'>Lançar Nota </h2>
          <img src="/icons/plus.svg" alt="Ícone de mais" className="plus-icon" />
        </button>
      </div>
      <div className='Cards'>
        {Object.entries(notas).map(([disciplina, nota]) => (
          <div className="card-container" key={disciplina}>
            <div className={`card ${disciplina}`}>
              <h2 className="card-title">{disciplina}</h2>
              <p className="card-date">01/01/2024</p>
              <div className="card-note">
                <img src="/Icons/Chart.svg" alt="Ícone" className="IconImg"/> Nota: {nota}
              </div>
            </div>
            <img src="/Icons/Trash.svg" alt="Lixeira" className="trash-icon" onClick={() => onZeroNota(disciplina)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGroup;
