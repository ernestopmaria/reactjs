import React,{useState ,useEffect} from "react";
import api from './services/api';
import "./styles.css";


function App() {
  const[ repositories, setRepository ] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',
    {
      title:`new repository ${Date.now()}`,
      techs:["Node JS",
               "Javascript"
              ],
      url:"https://github.com/ernestopmaria"
    });

    const repository = response.data;
    console.log(repository)
    setRepository([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const filteredRepos = repositories.filter(repo => repo.id !== id)

    setRepository(filteredRepos);
  }

  return (
    <div>
       <ul data-testid="repository-list">
        
        {repositories.map(repo => {
          return(
            <li key={repo.id}>{repo.title}
              <button 
              onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}

    </ul>

    <button onClick={handleAddRepository}type="button">Adicionar</button>
    </div>
  );
}

export default App;