import { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';

import MoviesListItem from './MoviesListItem';
import LoadingIndicator from '../common/LoadingIndicator';
import IMovies from '../../models/IMovies';
import { LoadingStatus } from '../../models/types';
import { getmovies } from '../../services/movies';

type Props = {
    category:string
    query:string
};

type State = {
    status: LoadingStatus,
    movies?: IMovies[],
    error?: Error
};

class MoviesList extends Component<Props, State> {
    state : State = {
        status: 'LOADING',
    };    

    render() {
        let el
        const { status, movies, error } = this.state;
        sessionStorage.setItem('movieCategory', this.props.category)    

        switch( status ) {
            case 'LOADING':
                el = (
                    <div style={{marginTop:'60px'}}>
                        <LoadingIndicator
                            size="medium"
                            message="We are fetching the list of movies. Please wait..."
                        />
                    </div>
                );
                break;
            case 'LOADED':
                el = (
                    <>
                    <div style={{marginTop:'60px'}}>
                        <Row xs={1} sm={2} md={4} lg={5} xl={6}>
                            {
                                movies?.map(
                                    movie => (
                                        <Col key={movie.poster} className="d-flex align-items-stretch my-3">
                                            <MoviesListItem
                                                movie={movie} cat={this.props.category}
                                            />
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </div>
                    </>
                );
                break;
            case 'ERROR_LOADING':
                el = (
                    <div style={{marginTop:'60px'}}>
                        <Alert variant="danger my-3">
                            {error?.message}
                        </Alert>
                    </div> 
                );
                break;
        }
    
        return el;
    }

    async componentDidMount() {
        this.setState({
            status: 'LOADING'
        });

        try {
            const data = await getmovies(this.props.category);
            const movieList = data.filter((list) => { 
                if (this.props.query === '') {
                    return list;
                } else {
                    return list.title.toLowerCase().includes(this.props.query)
                }
            }
            )
            this.setState({
                status: 'LOADED',
                movies: movieList
            });
        } catch( Error ) {
            this.setState({
                status: 'ERROR_LOADING'
            });
        }
    }
    
}

export default MoviesList;