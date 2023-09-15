import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import blur from "./blur.png"

export default function App() {
  return (
    <div className="antialiased relative grid min-h-[100vh] w-screen p-8 ">
      <div className="absolute  top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <img src={blur} className="w-[90rem] opacity-60 flex-none max-w-none dark:block" alt="" />
        </div>
      </div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

