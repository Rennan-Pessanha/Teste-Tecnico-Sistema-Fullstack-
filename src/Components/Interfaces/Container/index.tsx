import React, { useState } from 'react';
import './Styles.css';
import Modal from '../../Modal/Modal';
import CardGroup from '../CardGroups';

type NotasType = {
  "PRIMEIRO": Record<string, number>;
  "SEGUNDO": Record<string, number>;
  "TERCEIRO": Record<string, number>;
  "QUARTO": Record<string, number>;
};

export const Interface = () => {
  
  
  const initialState: NotasType = {
    "PRIMEIRO": { Biologia: 5, Artes: 5, Geografia: 5, Sociologia: 5.9 },
    "SEGUNDO": { Biologia: 5, Artes: 5, Geografia: 5, Sociologia: 5.9 },
    "TERCEIRO": { Biologia: 5, Artes: 5, Geografia: 5, Sociologia: 5.9 },
    "QUARTO": { Biologia: 5, Artes: 5, Geografia: 5, Sociologia: 5.9 }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notas, setNotas] = useState<NotasType>(initialState);
  const [bimestreSelecionado, setBimestreSelecionado] = useState("1º Bimestre");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("");
  const [novaNota, setNovaNota] = useState(0);

  const handleOpenModal = (bimestre: string) => {
    setBimestreSelecionado(bimestre);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isKeyOfNotasType = (key: string): key is keyof NotasType => {
    return key in notas;
  };

  const handleDisciplinaClick = (disciplina: string) => {
    if (isKeyOfNotasType(bimestreSelecionado) && disciplina in notas[bimestreSelecionado]) {
      setDisciplinaSelecionada(disciplina);
      setNovaNota(notas[bimestreSelecionado][disciplina]);
    }
  };

  
  
  const handleConfirmarNota = async () => {
    if (isKeyOfNotasType(bimestreSelecionado) && disciplinaSelecionada in notas[bimestreSelecionado]) {
      handleNotaChange(bimestreSelecionado, disciplinaSelecionada, novaNota);

      try {
        const response = await fetch('http://localhost:10000/resultados', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bimestre: bimestreSelecionado,
            disciplina: disciplinaSelecionada,
            nota: novaNota
          })
        });

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const json = await response.json();
        console.log('Resposta do servidor:', json);
        alert('Nota enviada com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar dados para o servidor:', error);
        alert('Falha ao enviar nota.');
      }

      handleCloseModal();
    }
  };

  

  const handleNotaChange = (bimestre: keyof NotasType, disciplina: string, novaNota: number) => {
    setNotas(prevNotas => ({
      ...prevNotas,
      [bimestre]: {
        ...prevNotas[bimestre],
        [disciplina]: novaNota
      }
    }));
  };

  const handleZeroNota = (disciplina: string) => {
    if (isKeyOfNotasType(bimestreSelecionado)) {
      setNotas(prevNotas => ({
        ...prevNotas,
        [bimestreSelecionado]: {
          ...prevNotas[bimestreSelecionado],
          [disciplina]: 0
        }
      }));
    }
  };
  
  return (
    <div className='Interface'>
      {Object.entries(notas).map(([bimestre, notasBimestre]) => (
        <CardGroup 
          key={bimestre} 
          title={bimestre} 
          notas={notasBimestre} 
          onOpenModal={handleOpenModal} 
            onZeroNota={handleZeroNota}
        />
      ))}
      <Modal show={isModalOpen} onClose={handleCloseModal}>
      <div className="modal-backdrop">
        <div className="modal">
          <h1 className='B-Text'>{bimestreSelecionado}</h1>
          <h2 className='Dis-Text'>Disciplinas</h2>
          <div className="disciplinas-buttons">
          {isKeyOfNotasType(bimestreSelecionado) && Object.keys(notas[bimestreSelecionado]).map(disciplina => (
            <button 
              key={disciplina} 
              onClick={() => handleDisciplinaClick(disciplina)}
              className={`button-${disciplina}`}
            >
              {disciplina}
            </button>
          ))}
        </div>

          <div className="nota-input">
            <label htmlFor="nota" className="label-nota">Nota: </label>
            <input type="text" id="nota" value={novaNota} onChange={(e) => setNovaNota(Number(e.target.value))} />
          </div>
          <button className='Confirm-Button' onClick={handleConfirmarNota}>Confirmar</button>
        </div>
      </div>

      </Modal>
    </div>
  );
};

export default Interface;
