import React, {useState} from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import './App.css';
import {AppContextProvider, initialAppState} from "./context/AppContext";
import {TopicsProvider} from "./context/TopicContext";
import LoginComponent from "./components/LoginComponent";
import Home from "./components/Home";
import AllTopicsComponent from "./components/AllTopicsComponent";
import AddTopicComponent from "./components/AddTopicComponent";
import RegisterComponent from "./components/RegisterComponent";
import AllSubjectsComponent from "./components/SubjectFolder/AllSubjectsComponent";
import AddSubjectComponent from "./components/SubjectFolder/AddSubjectComponent";
import {SubjectsProvider} from "./context/SubjectContext";
import {TodosProvider} from "./context/TodoContext";
import AddTodoComponent from "./components/TodosFolder/AddTodoComponent";
import AllTodosComponent from "./components/TodosFolder/AllTodosComponent";
import Logout from "./components/Logout";

function App() {
  const setAuthInfo = (token: string | null, userEmail: string, userName: string, refreshToken: string) : void =>{
    setAppState({...appState, token, userEmail, userName, refreshToken})
  }
  const [appState, setAppState] = useState({...initialAppState, setAuthInfo});
  return (
    <div className="container">
      {/*<BookContextProvider value={bookState}>*/}
      <TodosProvider>
      <TopicsProvider>
        <SubjectsProvider>
        <AppContextProvider value={appState}>
          <Router>
            <Link to={"/"}>Main</Link> |
            <Link to={"/login"}> Login</Link> |
            <Link to={"/register"}> Register</Link> |
            <Link to={"/topics"}> Topics </Link> |
            <Link to={"/add-book"}> Add Topic </Link> |
            <Link to={"/add-subject"}> Add Subject </Link> |
            <Link to={"/subjects"}> Subjects </Link> |
            <Link to={"/add-todo"}> Add Todo </Link> |
            <Link to={"/todos"}> Todos </Link> |
            <Link to={"/logout"}> Logout </Link>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/login" element={<LoginComponent></LoginComponent>}></Route>
              <Route path="/register" element={<RegisterComponent></RegisterComponent>}></Route>
              <Route path="/topics" element={<AllTopicsComponent></AllTopicsComponent>}></Route>
              <Route path="/add-book" element={<AddTopicComponent></AddTopicComponent>}></Route>
              <Route path="/add-subject" element={<AddSubjectComponent></AddSubjectComponent>}></Route>
              <Route path="/subjects" element={<AllSubjectsComponent></AllSubjectsComponent>}></Route>
              <Route path="/add-todo" element={<AddTodoComponent></AddTodoComponent>}></Route>
              <Route path="/todos" element={<AllTodosComponent></AllTodosComponent>}></Route>
              <Route path="/logout" element={<Logout></Logout>}></Route>

            </Routes>
          </Router>
        </AppContextProvider>
        </SubjectsProvider>
      </TopicsProvider>
      </TodosProvider>
      {/*</BookContextProvider>*/}
    </div>
  );
}

export default App;
