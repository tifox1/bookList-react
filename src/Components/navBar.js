import { useNavigate } from "react-router";
export default function NavBar(){
    const navigate = useNavigate();

    function handleRedirect(link) {
        navigate(`/${link}`);
    }
    return(
        <footer>
            <div onClick={() => handleRedirect('')}>
                <p>BookList</p>
            </div>
            <div onClick={() => handleRedirect('addbook')}>
                <p>Add Book</p>
            </div>
        </footer>
    );    
}