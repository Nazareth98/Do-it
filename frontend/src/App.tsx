import { useContext, useEffect } from "react";
import ScreenLogin from "./screens/login";
import ScreenPanel from "./screens/panel";
import { authContext } from "./contexts/authContext";

function App() {
  const { isLogged, signInPersistent } = useContext(authContext);

  useEffect(() => {
    signInPersistent?.();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-950 flex items-center justify-center">
      {isLogged ? <ScreenPanel /> : <ScreenLogin />}
    </div>
  );
}

export default App;
