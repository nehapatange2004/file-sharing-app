
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UploadFile from "./components/UploadFile";
import Navbar from "./components/Navbar";
import PublicDocs from "./components/PublicDocs";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import RenderDocWithParams from "./components/RenderDocWithParams";
import { auth } from "./wrapper/authWrapper";
import SignIn from "./components/Signin";
import SignUp from "./components/SignUp";
import User from "./components/User";
import PrivateDocs from "./components/PrivateDocs";

function App() {
  const {checkAuth, theme, setTheme} = auth();
  useEffect(()=>{
    const check = async()=>{
      
    try{
      await checkAuth();
      

    }catch(err) {
      console.log(err);
    }
    }
    check();
  }, [])
  return (

    <div data-theme={theme} className="transition-all duration-300 ease-in-out">
      <Navbar />
       <div>
        <Toaster />
      </div>
          
      <div className="min-h-[calc(100vh-90px)]">
      <Routes>
        <Route path="/" element={<PublicDocs />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="/mydocs" element={<PrivateDocs />} />
        <Route path="/:id" element={<RenderDocWithParams />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
