import { useHref } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{textAlign: 'center'}}>
            <button><a href="/">Go to home page</a></button>
            <h1 style={{color: 'grey'}}><b>Page not found</b></h1>
            <img src="../src/images/error-404.png"></img>
        </div>
    );
}