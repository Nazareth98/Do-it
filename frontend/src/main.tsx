import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/authContext.js";
import { MemberContextProvider } from "./contexts/memberContext.js";
import { TicketContextProvider } from "./contexts/ticketContext.js";
import { CustomerContextProvider } from "./contexts/customerContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <MemberContextProvider>
        <TicketContextProvider>
          <CustomerContextProvider>
            <App />
          </CustomerContextProvider>
        </TicketContextProvider>
      </MemberContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
