import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import {Libros as BooksContext} from '../BooksContext';

export default function BookDetails() {
    const books = useContext(BooksContext);

    const [detail, setDetail] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        let detailBook = [];
        detailBook = books.filter((book) => id === book.id);
        setDetail(detailBook[0]);
    }, []);

    return(
        <div style={{
            textAlign:'center',
            width:'90%'
        }} className="book-details">
            {/* titulo */}
            <div className="title-div">
                <p>{detail?.nombre}</p>
            </div>
            {/* detalles */}
            <div className="info-div">
                {/* imagen */}
                <div>
                    <img src={detail?.imagen} width="600px" alt="img"/>
                </div>
                {/* introduccion  y autor*/}
                <div className="intro-div">
                    <div><p>{detail?.introduccion}</p></div>
                    <div className="autor-div"><p><b>Autor: </b>{detail?.autor}</p></div>
                </div>
            </div>
        </div>    

        // <></>   
    );
}