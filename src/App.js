import './App.css';
import { Home } from './routes/Home/Home';
import { Routes, Route } from 'react-router-dom';
import { SingleUser } from './components/SingleUser/SingleUser';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
function App() {
	return (
		<Routes>
			{/* here we are persisting the navigation and with index we match the compoentn to home */}
			<Route path='/' element={<Home />} index />
			<Route path='user/:id' element={<SingleUser />} />
		</Routes>
	);
}

export default App;
