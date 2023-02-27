import { useState } from 'react';
import { Libros } from './BooksContext';
import NavBar from './Components/navBar';
import BookList from './Components/BooksList';
import AddBook from './Components/addBook';
import BookDetails from './Components/bookDetails';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import './App.css';


function App() {
  const [books, setBooks] = useState([]);

  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <div className="App">
                {/* <Router> */}
                  <Libros.Provider value={books}>
                      <Routes>
                          <Route path='/' element={<BookList/>}/>
                          <Route path='/addbook' element={<AddBook books={books} setBooks={setBooks}/>}/>
                          <Route path='/bookdetails/:id' element={<BookDetails/>}/>
                      </Routes>
                  </Libros.Provider>
                {/* </Router>  */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
