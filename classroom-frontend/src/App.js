import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import PrincipalDashboard from './components/PrincipalDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/principal/dashboard" component={PrincipalDashboard} />
                    <PrivateRoute path="/teacher/dashboard" component={TeacherDashboard} />
                    <PrivateRoute path="/student/dashboard" component={StudentDashboard} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
