import {useEffect, useState} from "react"
import Table from "../components/Table"
import { useNavigate } from "react-router-dom"
import Searcher from "../components/Searcher"
import { getPokemons } from "../services"
import {PATH_DETAILS} from "../env";

function List() {
  const navigate = useNavigate()
  const [columns] = useState(['name', 'url'])
  const [items, setItems] = useState([{col1: 'cosa1 as a das dsad ', col2: 'csa1', col3: 'srasda1'}, {col1: 'cosa2', col2: 'csa2', col3: 'srasda2'}])
  const [text2search, setText2search] = useState('')
  const onChange = ({text}) => {
    setText2search(text)
  }
  const onClickItem = ({ name } = {}) => {
    navigate(PATH_DETAILS.replace(':name', name))
  }
  useEffect(() => {
    const fetchData = async () => {
      const pokemons = await getPokemons({ filter: text2search })
      setItems(pokemons)
    }
    fetchData()
  }, [text2search])

  return (
    <div className="container">
      <div className="row">
        <div className="twelve column mt-1">
          <Searcher onChange={onChange} placeholder="Busca tu pokemon"/>
        </div>
        <div className="twelve columns mt-1">
          <Table height='75vh' columns={columns} items={items} onClickItem={onClickItem}></Table>
        </div>
        <div className='twelve columns align-right mt-1'>Total elements: {items.length}</div>
      </div>
    </div>
  );
}

export default List;
