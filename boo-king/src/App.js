import {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "../src/Home/Home"
import List from "./List/List";
import './App.scss'
import SearchList from "./SearchList/SearchList";
import OneHotel from "./OneHotel/OneHotel";
import Test from "./test";
import Sign_in from "./Sign-in/Sign-in";
import Sign_up from "./Sign_up/Sign_up";
function App() {

  const type = "type"

  return (
    <div className="App">
    <BrowserRouter> 
      <Routes>
          <Route path="/"  element={  <Home/>}  />
          <Route path="/hotels"   element={  <SearchList type={type} />}  />
          <Route path="/hotels/:id"  element={  <OneHotel type={type}/>}  />
          <Route path="/sign_in"  element={  <Sign_in/>}  />
          <Route path="/sign_up"  element={  <Sign_up/>}  />

      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
