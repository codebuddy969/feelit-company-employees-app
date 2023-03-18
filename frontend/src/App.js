import "./App.css";
import Login from "./pages/login";
import Roles from "./pages/roles";
import Companies from "./pages/companies";
import Employees from "./pages/employees";

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
            <Routes>
                <Route path="/companies" element={<Companies />} />
            </Routes>
            <Routes>
                <Route path="/employees" element={<Employees />} />
            </Routes>
            <Routes>
                <Route path="/roles" element={<Roles />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
