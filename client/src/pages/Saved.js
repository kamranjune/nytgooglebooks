import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem, ViewBtn, DeleteBtn } from "../components/List";


class Saved extends Component {
  state = {
    savedBooks: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
    .then(res => this.setState({ savedBooks: res.data }))
    .catch(err => console.log(err));
  }

  viewBook = (link) => {
    window.open(link, "_blank");

  }
  
  deleteBook = (book) => {
    {/* //? NO EVENT.PREVENTDEFAULT ON AN ONCLICK SUBMIT? ONLY ON A BUTTON?  API CALL? */}
    // event.preventDefault();

    console.log (book);

    API.deleteBook(book._id)
      // .then((res) => this.loadBooks())
      .then( (res) => {this.loadBooks() })
      //.then(res.status(200)) does not work
      //.then(res.json({})) does not work
      //.then(res.status(200).end) does not work
      .catch(err => console.log(err));
  
};


    render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h2>Search for and Save Books of Interest</h2>
            </Jumbotron>
          </Col>
        </Row>
       
        <Row>
          <Col size="md-6">
            {/* <ContainerResults> */}
              <h3>Saved Books</h3>      
            {this.state.savedBooks.length ? (
              <List>
                 
                {this.state.savedBooks.map(book => (
                  <ListItem key={book.id}>
                        {/* //? NO EVENT.PREVENTDEFAULT ON AN ONCLICK SUBMIT? ONLY ON A BUTTON?  API CALL? */}
                   <DeleteBtn  onClick={() => this.deleteBook(book)} />
                   <ViewBtn  onClick={() => this.viewBook(book.link)} /> 

                    Title: {book.title} <br/>
                    Author:  {book.authors}<br/>
                    Description: {book.description}<br/>
                    <img src={book.image}/><br/>
                    
                    {/* <ViewBtn disabled={!(book.id)} formaction={book.link}/> */}



                {/* {this.state.books.filter(items => (
                  <ListItem title={items.volumeInfo.title}>
                  < */}      
{/* Major Question 1:  how to display?  

  1.  display to Results directly from API?  (side question: where to format res.data.data object for desired display?)
  2.  take from API, 
        put into state, 
            display results from State?
  3.  take from API, 
        put into state, 
            put into DB from state, 
                display results from DB?
  4.  take from API, 
          put into DB,
            display results from DB?

  5.  take from API, 
            put into DB, 
                put into books.json, 
                    put into state, 
                        display results from state

Major Question 2:  Where to Route API vs. Storage?
    1.  GoogleBooks API:  (React) src -->  components -->  ../utils --> API.js --> (../Node/Express) routes --> api --> books.js--> http://googlebooks
    2.  MongoDB:  (React) src -->  components -->  ../utils --> API.js --> (../Node/Express) routes --> api --> books.js  --> controllers --> booksController.js --> mongodb://localhost/googlebooks
[[react API ServerRoutes DB  (Return)  DB  serverroutes reactapi]] */}
              
                                      </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            
            {/* </ContainerResults> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
