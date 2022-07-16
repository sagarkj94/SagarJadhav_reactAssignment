import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import LoadingIndicator from './common/LoadingIndicator'
import MoviesList from './movies-list/MoviesList'

type Props = {
    category : string
}

export default function ShowFilteredItem({category}:Props) {
    const [searchQuery, setSearchQuery] = useState('')
    const [status, setStatus] = useState('LOADING')

    function handleSearch (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setSearchQuery(e.target.value.toLowerCase())
        setStatus('LOADING')
    }

    useEffect(()=>{
        setStatus('LOADED')
    }, [searchQuery]) 


  return (
      <>
        <Navbar bg="white" expand="lg" style={{position: "fixed", borderRadius:'3px', top: "10px", right:'10px',zIndex: 9999}}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant='tabs' style={{ marginLeft:'3px', marginRight:'3px'}}>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={e=>{handleSearch(e)}}
                            />
                            <Button variant="outline-primary">
                                <FontAwesomeIcon style={{color:"grey",marginLeft:"3px"}} icon={faSearch} className="me-2" />
                            </Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
        {   status==='LOADING' &&
            <LoadingIndicator size='medium' message='Loading...'/>
        }
        {   status==='LOADED' &&
            <MoviesList category={category} query={searchQuery} />
        }
    </>
  )
};