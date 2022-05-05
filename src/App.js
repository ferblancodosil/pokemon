import {useState} from "react";
import Table from "./components/Table";

function App() {
 const [columns] = useState(['col1', 'col2', 'col3'])
 const [items] = useState([{col1: 'cosa1 as a das dsad ', col2: 'csa1', col3: 'srasda1'}, {col1: 'cosa2', col2: 'csa2', col3: 'srasda2'}])
 return (
  <div className="App">
   <Table columns={columns} items={items}></Table>
  </div>
 );
}

export default App;
