import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Deletion from './components/Deletion';
import Home from './components/Home';
import Login from './components/Login';
import Modification from './components/Modification';
import Profile from './components/Profile';
import SplitScreen from './components/SplitScreen';
import Container from './Container';
import '../scss/container.scss';
import { useState } from 'react';
import { UserContext } from './context/userContext';
import ErrorBoundary from './error/ErrorBoundary';

const AppRouter = () => {

    const [state, setUserState] = useState({ user: {}, isLoggedIn: false });

    return (
        <ErrorBoundary>
            <UserContext.Provider value={state}>

                <Router>
                    <nav className='navigation'>
                        <Link to='/'>Home</Link> <br />
                        <Link to='/login'>Login</Link><br />
                        <Link to='/profile'>Profile</Link><br />
                        <Link to='/update'>Update</Link><br />
                        <Link to='/delete'>Delete</Link><br />
                    </nav>
                    <Switch>

                        <Route path='/login' component={() => <Container>
                            <Login updateUserState={setUserState}/>
                        </Container>}>
                        </Route>

                        <Route path='/profile' component={() => <Container>
                            <Profile/>
                        </Container>}>
                        </Route>

                        <Route path='/update' component={() => <Container>
                            <SplitScreen leftWeight='400px' rightWeight='400px'>
                                <Profile/>
                                <Modification updateUserState={setUserState}/>
                            </SplitScreen>
                        </Container>}>
                        </Route>

                        <Route path='/delete' component={() => <Container>
                            <SplitScreen>
                                <Profile/>
                                <Deletion updateUserState={setUserState}/>
                            </SplitScreen>
                        </Container>}>
                        </Route>

                        <Route path='/' component={() => <Container>
                            <Home/>
                        </Container>}>
                        </Route>

                    </Switch>
                </Router>

            </UserContext.Provider>
        </ErrorBoundary>
    );
};

export default AppRouter;
