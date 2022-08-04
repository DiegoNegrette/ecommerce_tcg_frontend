import "./App.css";
import Store from "./pages/Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="body">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Store />} />
					{/* <Route path="/" element={<Products />} /> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
