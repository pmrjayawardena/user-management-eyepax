import './App.css';
import { Home } from './routes/Home/Home';
import { Routes, Route } from 'react-router-dom';
import { SingleUser } from './components/SingleUser/SingleUser';
import 'react-toastify/dist/ReactToastify.css';
import { Navigation } from './components/Navigation/Navigation';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='user/:id' element={<SingleUser />} />
			</Route>
		</Routes>
	);
}

export default App;
