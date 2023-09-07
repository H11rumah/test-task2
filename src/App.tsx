import React from "react";
import "./styles/App.scss";
import Header from "./components/Header";
import Books from "./components/Books";

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <Books />
        </div>
    );
};

export default App;
