import "./App.css";
import LogIn from "./Components/Static/authComponent";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signout } from "./Data/auth";
import Home from "./Components/Pages/Home";
import { useEffect } from "react";
import { getData } from "./Data/firestore";

function App() {
  const [user, loading, error] = useAuthState(auth);
  
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start bg-slate-100">
      <div className="w-full max-w-7xl min-h-screen h-full flex flex-col items-center justify-center">
        {!user && !loading && <LogIn />}
        {user && loading && <div>Signing In...</div>}
        {user && !loading && <Home/>}
      </div>
    </div>
  );
  // <div>
  // <button onClick={()=>(getData())}>Click to get data</button>
  // <button onClick={()=>(updateDb())}>Click to update data</button>
  // <button onClick={()=>(getQuery())}>Click to get Query data</button>
  // </div>;
}

export default App;
