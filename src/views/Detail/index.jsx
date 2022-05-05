import { useParams } from "react-router"
import { getPokemons, getDetails, getForms } from "../../services"
import {useEffect, useLayoutEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import "./index.scss"
import Table from "../../components/Table";

function Index() {
  let { name } = useParams();
  const navigate = useNavigate()
  const [sprite, setSprite] = useState('')
  const [abilities, setAbilities] = useState([])
  const [forms, setForms] = useState([])
  const [heightTable, setHeightTable] = useState('75vh')
  const [moves, setMoves] = useState([])
  useEffect(() => {
    const loadData = async () => {
      const pokemons = await getPokemons({ filter: name })
      if (!pokemons.length) navigate('/')
      const details = await getDetails(pokemons[0])
      const forms = await getForms(details)
      const { sprite: url, abilities, moves: movements } = details
      setMoves(movements.map(move => ({ moves: move.move.name })))
      setAbilities(abilities)
      setSprite(url)
      setForms(forms)
    }
    loadData()
  }, [name, navigate])

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 576 && heightTable !== '30vh') {
        setHeightTable('30vh')
      } else if (window.innerWidth > 575 && heightTable !== '70vh') {
        setHeightTable('70vh')
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [heightTable]);

  const removeMovement = (element) => {
    const _moves = [...moves]
    const positionItem = _moves.indexOf(element)
    if (positionItem > -1) {
      _moves.splice(positionItem, 1)
      setMoves(_moves)
    }
  }

  return (
      <>
        <div className="container detail">
          <Link style={{position: 'absolute', top: '15px', right: '15px'}} to="/"><img alt="close" src="/close.png" width="15"/></Link>
          <div className="row">
            <div className="six columns">
              <div className="twelve columns">
                <img className="responsive" alt="sprite" src={sprite}/>
              </div>
              <div className="twelve columns">
                <h3>{name}</h3>
                <h6>{forms.map((form, index) => <span key={index}>Nº: {form.id} { form.is_battle_only ?  'with' : 'without' } Battle Mode</span>)}</h6>
                <div className="row">{abilities.map((item, index) => <span key={index} className="tag">{item.ability.name}</span>)}</div>
              </div>
            </div>
            <div className="six columns">
              <div className="row">
                <div className="twelve columns mt-1">
                  <Table height={heightTable} columns={['moves']} items={moves} onClickItem={removeMovement} cursorclick="url('data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAYAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAMAAAAFQAAABwAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAVAAAADAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABwAAAAvAAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAAC8AAAAcAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAALAAAAEUAAABMAAAATAAAAEwAAABMAAAATAAAAEwAAABMAAAARQAAACwAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAFMAAABRAAAANQAAABkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/qKio/6ioqP+oqKj/qKio/6ioqP+oqKj/qKio/6ioqP+oqKj/AAAA/wAAAFQAAAA4AAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+oqKj/AAAA/6ioqP8AAAD/qKio/wAAAP+oqKj/AAAA/6ioqP8AAAD/AAAAVQAAADkAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/6ioqP8AAAD/qKio/wAAAP+oqKj/AAAA/6ioqP8AAAD/qKio/wAAAP8AAABVAAAAOQAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/qKio/wAAAP+oqKj/AAAA/6ioqP8AAAD/qKio/wAAAP+oqKj/AAAA/wAAAFUAAAA5AAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+oqKj/AAAA/6ioqP8AAAD/qKio/wAAAP+oqKj/AAAA/6ioqP8AAAD/AAAAVQAAADkAAAAdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/6ioqP8AAAD/qKio/wAAAP+oqKj/AAAA/6ioqP8AAAD/qKio/wAAAP8AAABVAAAAOwAAAB8AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/qKio/wAAAP+oqKj/AAAA/6ioqP8AAAD/qKio/wAAAP+oqKj/AAAA/wAAAFUAAABCAAAAJQAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAwAAAP+oqKj/qKio/6ioqP+oqKj/qKio/6ioqP+oqKj/qKio/6ioqP8AAAD/AAAAVAAAAEcAAAAsAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAAMAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAABPAAAAQwAAACkAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAP+oqKj/qKio/6ioqP+oqKj/qKio/6ioqP+oqKj/qKio/6ioqP+oqKj/qKio/wAAAP8AAAAuAAAAHAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXAAAA/6ioqP+oqKj/qKio/6ioqP+oqKj/qKio/6ioqP+oqKj/qKio/6ioqP+oqKj/AAAA/wAAABUAAAAMAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAABIAAAAiAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAYAAAABgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAABIAAAAZAAAAEAAAAP8AAAAKAAAAEQAAABcAAAAVAAAAFQAAAP8AAAAXAAAAEQAAAAoAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAAgAAAAFAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAcAAAAFAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////////////////////////////////////////////////////////////////////////wB///4AP//+AD///gA///4AP//+AD///gA///4AP//+AD///gA///wAH//8AB//9gA///O+///xgP//8='), auto"></Table>
                </div>
                <div className='twelve columns align-right mt-1'>Total moves: {moves.length}</div>
              </div>
            </div>
          </div>
        </div>

      </>
  );
}

export default Index;
