import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function Pagination(props : any){
    const { page } = props;
    const { maxPage } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const maxDisplayPages = 10;

    function paginate(direction : number){
        return () => {
            let newPage = parseInt(page) + direction;
            if(newPage > 0 && newPage <= maxPage){
                navigate(location.pathname.replace(/\/\d+$/, "/" + newPage))
            }
        }
    }

    return(
        <>
        {page > 1 && <button className="btn-reset page-btn" onClick={paginate(-1)}> <FontAwesomeIcon icon={faArrowLeft}/> </button>}
        {page > maxDisplayPages && <button className="btn-reset page-btn" onClick={paginate(-maxDisplayPages)}> ... </button>}
        {page > 2 && <button className="btn-reset page-btn" onClick={paginate(-2)}> {parseInt(page) - 2} </button>}
        {page > 1 && <button className="btn-reset page-btn" onClick={paginate(-1)}> {parseInt(page) - 1} </button>}
        <span className="current-page">{page}</span>
        {page < maxPage && <button className="btn-reset page-btn" onClick={paginate(+1)}> {parseInt(page) + 1} </button>}
        {page < maxPage - 1 && <button className="btn-reset page-btn" onClick={paginate(+2)}> {parseInt(page) + 2} </button>}
        {page < maxPage - maxDisplayPages && <button className="btn-reset page-btn" onClick={paginate(maxDisplayPages)}> ... </button>}
        {page < maxPage && <button className="btn-reset page-btn" onClick={paginate(+1)}> <FontAwesomeIcon icon={faArrowRight}/> </button>}
        </>
    )
}

export default Pagination;