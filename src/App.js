import "./App.css";
import Products from "./pages/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="body">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Products />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
