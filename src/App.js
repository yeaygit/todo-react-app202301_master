
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import TodoTemplate from './components/todo/TodoTemplate';
import 'bootstrap/dist/css/bootstrap.min.css';
import Join from './components/user/Join';
import Login from './components/user/Login';

function App() {
  return (
    <>
      <Header />
      {/* <TodoTemplate /> */}

      {/* <Join /> */}

      <Login />

      <Footer />
    </>
  );
}

export default App;
