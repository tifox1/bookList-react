import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBook(props){
    const nombre = useRef();
    const autor = useRef();
    const image = useRef();
    const introduccion = useRef();
    const [imagen, setImagen] = useState();
    const [errorFile, setErrorFile] = useState(true);
    const [errorForm, setErrorForm] = useState(true);
    const navigate = useNavigate();


    const [validation, setValidation] = useState({
        nombre: {
            state: false,
            message: ''
        },
        introduccion: {
            state: false,
            message: ''
        },
        autor: {
            state: false,
            message: ''
        },
        image: {
            state: false,
            message: ''
        },

    });
    
    function handleFile(event) {
        event.preventDefault();
        const validations = {...validation}
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            validations.image.state = true;
            validations.image.message = 'File has to be JPEG/PNG';
            console.log('validation 1');
            setValidation(validations);
            setErrorFile(true);

        } else if (file.name === '') {
            validations.image.state = true;
            validations.image.message = 'Have to load an image';
            console.log('validation 2');
            setValidation(validations);
            setErrorFile(true);
        } else {
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setImagen(reader.result.toString());
            };   
            setErrorFile(false);
    
        }
    };
  
    function handleValidation() {
        let validations = {...validation}
        //rules
        try {
            if(introduccion.current.value.length > 400) {
                validations.introduccion.state = true;
                validations.introduccion.message = 'Exceed 400 caracteres';
                setValidation(validations);
                setErrorForm(true);
    
            } else if(introduccion.current.value === '') {
                validations.introduccion.state = true;
                validations.introduccion.message = 'This field has no value';
                setValidation(validations);
                console.log('2');
                setErrorForm(true);

            } else if(autor.current.value === '') {
                validations.autor.state = true;
                validations.autor.message = 'This field has no value';
                setValidation(validations);
                console.log('3');
                setErrorForm(true);
    
            } else if (nombre.current.value === '') {
                validations.nombre.state = true;
                validations.nombre.message = 'This field has no value';
                setValidation(validations);
                console.log('4');
                setErrorForm(true)
    
            } else {
                validations.introduccion.state = false;
                validations.introduccion.message = '';
                validations.autor.state = false;
                validations.autor.message = '';
                validations.nombre.state = false;
                validations.nombre.message = '';
                setValidation(validations);
                setErrorForm(false);
            }
        } catch (validation) {
            console.log('validation')
        }
    }


    function handleSubmit(event) {
        event.preventDefault();

        if(errorForm === false && errorFile === false) {
            let arrayUpdated = [];

            arrayUpdated = [
                {
                    id: crypto.randomUUID(),
                    nombre: nombre.current.value,
                    autor: autor.current.value,
                    imagen: imagen,
                    introduccion: introduccion.current.value,
                }, ...props.books
            ];
            props.setBooks(arrayUpdated);
    
            navigate('/');
        }
    }   

    return(
        <div className="add-book-div">
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <div className="input-div">
                        <label>
                            Nombre: 
                        </label>
                        <input type="text" ref={nombre} onChange={() => handleValidation()}></input>
                        {validation.nombre.state ? <p style={{fontSize: '10px'}}>{validation.nombre.message}</p>: ''}
                    </div>

                    <div className="input-div">
                        <label>
                            Autor: 
                        </label>
                        <input type="text" ref={autor} onChange={() => handleValidation()}></input>
                        {validation.autor.state ? <p style={{fontSize: '10px'}}>{validation.autor.message}</p>: ''}

                    </div>

                    <div className="input-div">
                        <label>
                            Imagen de la portada: 
                        </label>
                        <input ref={image} type="file" onChange={handleFile}></input>
                    </div>  

                    <div>
                        {!!imagen ? <img src={imagen} width="200px" alt=""/> : ''}
                        {validation.image.state ? <p style={{fontSize: '10px'}}>{validation.image.message}</p>: ''}
                    </div>
                    
                    <div className="input-div">
                        <label>
                            Introduccion: 
                        </label>
                        <input type="text" ref={introduccion} onChange={() => handleValidation()}></input>
                        {validation.introduccion.state ? <p style={{fontSize: '10px'}}>{validation.introduccion.message}</p>: ''}
                    </div>

                    <div className="input-div add-book-button">
                        <button type="submit">Agregar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}