import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';

import { Home } from './routes/home/Home';
import { SingleUser } from './components/singleUser/SingleUser';
import { Navigation } from './components/navigation/Navigation';

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
