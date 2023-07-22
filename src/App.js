import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import Coindetails from "./components/Coindetails";
import Footer from "./components/Footer";


function App() {
  return (
  <Router>
    <Header/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Coins" element={<Coins/>} />
        <Route path="/Exchanges" element={<Exchanges/>} />
        <Route path="/Coin/:id" element={<Coindetails/>} />
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
