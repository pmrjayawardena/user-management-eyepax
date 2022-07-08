import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';

import { Home } from './routes/home/Home';
import { SingleUser } from './components/singleUser/SingleUser';
import { Navigation } from './components/navigation/Navigation';
import { AddUser } from './components/addUser/AddUser';
import { EditUser } from './components/editUser/EditUser';
function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />

				<Route path='user/:id' element={<EditUser />} />
				<Route path='user/add' element={<AddUser />} />
			</Route>
		</Routes>
	);
}

export default App;
