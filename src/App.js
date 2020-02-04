import React, {useEffect, useState} from 'react';

//CONCEITOS DO REACT
//componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
  //=>FUNÇÃO QUE RETORNA ALGUM CONTEÚDO
//estado :  Informações mantidas pelo componente (lembrar : imutabilidade)
   
//propridade: informações que um componente pai passa aos filhos {parâmetro}


import './global.css';
import './Sidebar.css';
import './App.css';
import './Main.css';
import './services/api';
import api from './services/api';
import DevItem from './components/DevItem'; //ja pega o index automaticamente
import DevForm from './components/DevForm'; //ja pega o index automaticamente


function App() {

   //criando estados
   const [devs, setDevs] = useState([]);


  

  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);  
    }
    loadDevs();
  },[]);  

  async function handleAddDev(data){
   
    //fetch api nativa que faz chamada a serviços rest
    const response = await api.post('/devs', data)  
    
    setDevs([...devs, response.data]);

  }

  return (
    <div id = "app">
      <aside>
         <strong>Cadastrar</strong>
         <DevForm onSuubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map( dev => ( 
           <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>:

      </main>


    </div>
  );



}

export default App;
