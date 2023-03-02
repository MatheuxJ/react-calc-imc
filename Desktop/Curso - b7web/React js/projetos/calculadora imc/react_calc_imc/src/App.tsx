import { useState } from 'react';
import styles from './App.module.css';
import power from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'
import { levels, calcImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem';


const App = () => {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handle = () =>{
    if(heightField && weightField){
      setToShow(calcImc(heightField, weightField));
    }else{
      alert("digite todos os campos.");
    }
  }

  const handleBack = () =>{
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={power} alt="" width={150} />
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para índice de Massa Copórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input type="number" placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))} 
            disabled={toShow ? true : false}
            />

          <input type="number" placeholder="Digite o seu peso. Ex: 75.5 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))} 
            disabled={toShow ? true : false}
            />

            <button onClick={handle} disabled={toShow ? true : false}>Calcule</button>

        </div>
        <div className={styles.rightSide}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item} />
            ))}
          </div>
}
            {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBack}>
              <img src={leftArrowImage} alt="" width={25} />
              </div>
              
              <GridItem item={toShow}/>
            </div>
            }
        </div>
      </div>

    </div>
  )
}

export default App;