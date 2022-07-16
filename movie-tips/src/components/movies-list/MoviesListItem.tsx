import { Card, Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart } from '@fortawesome/free-solid-svg-icons';
import IMovies from '../../models/IMovies';

import {deleteFavouriteById, getmovies, saveFavourite} from '../../services/movies'
import { useEffect, useState } from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import LoadingIndicator from '../common/LoadingIndicator';

type Props = {
    movie: IMovies
    cat: string
};

const MoviesListItem = ( { movie, cat } : Props ) => {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('Loading')
    const [isFavourite, setIsFavourite] = useState(false)
    const [isFavouritePage, setIsFavouritePage] = useState(false)
    const [isNotFavourite, setIsNotFavourite] = useState(false)

    const {
        title ,
        posterurl
    } = movie;

    useEffect(
        () => {
            const checkFavourites = async () => {
                const data = await getmovies( 'favourit' )
                const currData = await getmovies(cat)
                const movieData = data.find(m=>(m.title===movie.title))
                if(movieData && (cat!=='favourit')){
                    setIsFavourite(true)
                    setStatus('Loaded')
                }
                if(!movieData && (cat!=='favourit')){
                    setIsNotFavourite(true)
                    setStatus('Loaded')
                }
                if(cat==='favourit'){
                    setIsFavouritePage(true)
                    setStatus('Loaded')
                }
                const m = currData.find(m=>(m.title===movie.title))
                if(!m)
                    setStatus('elementNotPresent')             
            };

            checkFavourites();
        },
        [show]
    );

    const handleFavBtn = async() => {
        await saveFavourite(movie.title, cat)
        setIsNotFavourite(false)
        setShow(true)
    }

    const handleRemBtn = async() =>{
        await deleteFavouriteById(movie.id)
        setShow(true)
    }

    let el =(
        <ToastContainer className="p-2" style={{position: "fixed",top: "10px",right: "10px",zIndex: 9999}}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                { !isFavouritePage &&
                    <Toast.Body>
                        <FontAwesomeIcon style={{color:"green"}} icon={faCheckCircle} className="me-2" />
                        Added Successfully
                    </Toast.Body>
                }
                { isFavouritePage &&
                    <Toast.Body>
                        <FontAwesomeIcon style={{color:"green"}} icon={faCheckCircle} className="me-2" />
                        Deleted Successfully
                    </Toast.Body>
                }
            </Toast>
        </ToastContainer>
    )

    return (
        <>
        { status === 'Loaded' &&
        <Card style={{ width: '18rem' }}>
            <Card.Link onClick={()=>{sessionStorage.setItem('movieTitle', movie.title)}} href={`/details/${title}`} style={{textAlign:'center'}}>
                 <Card.Img style={{width:'194px',height:'289px'}} variant="top" src={`${posterurl}`} />
            </Card.Link>
            <Card.Body>
                <Card.Title style={{fontSize: '14px'}} className="d-flex justify-content-between">
                    <div>
                        {title}
                    </div>
                </Card.Title>
                { isNotFavourite && 
                    <div>
                        <button onClick={e=>(handleFavBtn())} style={{color:"grey"}} className="btn btn-sm">
                                Add to favourite
                                <FontAwesomeIcon style={{color:"red",marginLeft:"3px"}} icon={faHeart} className="me-2" />
                        </button>
                    </div>
                }
                { isFavourite &&
                    <div style={{color:"grey"}} className="btn btn-sm">
                        Added in favourites 
                        <FontAwesomeIcon style={{color:"green"}} icon={faCheck} className="ms-2"/>
                    </div>
                }
                { isFavouritePage &&
                     <div>
                        <button onClick={e=>(handleRemBtn())} style={{color:"grey"}} className="btn btn-sm">
                            Remove from favourite
                                <FontAwesomeIcon style={{color:"red",marginLeft:"3px"}} icon={faTimesCircle} className="me-2" />
                        </button>
                    </div>
                }
            </Card.Body>
        </Card>
        }
        { status==='Loading' &&
            <LoadingIndicator
            size="small"
            message="Fetching.."
        />
        }
        {
            status==='elementNotPresent' && 
            <div>Removed</div>
        }
        {el}
        </>
    );
}

export default MoviesListItem;