import { useContext } from 'react';
import { Libros as L } from '../BooksContext';
import { useNavigate } from 'react-router';
export default function BookList(){
    const books = useContext(L);
    const navigate = useNavigate();

    function redirectDetails(id) {
        navigate(`/bookdetails/${id}`);
    }
    return (
        <div className="book-list-div">
            {books.map((index) => {
                return(
                    <div className="book-item-div" key={index.id}>
                        <div className='book-item-div-img'>
                            <img src={index.imagen} alt="img" onClick={() => redirectDetails(index.id)}></img>
                        </div>
                        <div>
                            <p>{index.nombre}</p>
                        </div>
                        <div><p>Autor: {index.autor}</p></div>
                    </div>
                );
            })}
            {/* {books && <p>{books}</p>} */}
        </div>
    );
}