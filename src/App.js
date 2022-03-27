import { Route, Routes, BrowserRouter } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Search from "./routes/Search";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/Detail/:id" element={<Detail />} />
            <Route path="/Search" element={<Search />} />
            <Route path="" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
         </Routes>
      </BrowserRouter>
   );
}
export default App;
