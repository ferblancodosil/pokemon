import List from './views/List'
import { BrowserRouter } from "react-router-dom"
import { Route, Routes } from "react-router"
import Detail from "./views/Detail"
import { PATH_DETAILS } from "./env"

function App() {
   return (
     <div className="app">
       <BrowserRouter>
         <Routes>
           <Route path={PATH_DETAILS} element={<Detail />} />
           <Route path="*" element={<List />} />
         </Routes>
       </BrowserRouter>
     </div>
   );
}

export default App;
