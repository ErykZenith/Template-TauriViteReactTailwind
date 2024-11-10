import App from './App.tsx'
import ReactDOM from "react-dom/client";
import './assets/styles/main.css'

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <App />
  );
}