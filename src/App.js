import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Passengers from './components/Passengers';
import PassengerID from './components/PassengerID';
import Groups from './components/Groups';
import Header from './components/Header';

import './App.css';

const queryClient = new QueryClient();
function App() {
	return (
		<Router>
			<Header />
			<QueryClientProvider client={queryClient}>
				<Switch>
					<Route path='/' component={Passengers} exact />
					<Route path='/find-passengers' component={PassengerID} />
					<Route path='/passengers-groups' component={Groups} />
				</Switch>
			</QueryClientProvider>
		</Router>
	);
}

export default App;
