import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, ViewBtn, SaveBtn } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/ContainerBookSearch";

class Search extends Component {
// constructor(props)
// {
//   //super(props);
//   //in constructor
//   //bind methods
//   ///this.handleSubmit = this.handleSubmit.bind(this)

// }
 


  state = {
    books : {},
    savedBooks: {}
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  saveBook = (book) => {
    {/* //? NO EVENT.PREVENTDEFAULT ON AN ONCLICK SUBMIT? ONLY ON A BUTTON?  API CALL? */}
    // event.preventDefault();

    console.log (book);

    API.saveBook({
      book: book,
      id: book.id,
      title: book.title,
      authors: book.authors,
      description: book.description,
      image:  book.image,
      link: book.link
    })
      // .then((res) => this.loadBooks())
      .then( (res) => { })
      //.then(res.status(200)) does not work
      //.then(res.json({})) does not work
      //.then(res.status(200).end) does not work
      .catch(err => console.log(err));
  
};



  viewBook = (link) => {
    window.open(link, "_blank");

  }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ savedBooks: res.data})
  //     )
  //     .catch(err => console.log(err));
  // };

  // loadBooks = () => {
  //   API.getBooks()
  //   .then(res =>
  //     this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //   )
  //     .catch(err => console.log(err));
  //     console.log({books});
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  // filterItems = (items) => {
  //   items.forEach( {
  //   this.state.items.volumeInfo.title,
  //   this.state.items.volumeInfo.authors,
  //   this.state.items.volumeInfo.description,
  //   this.state.items.volumeInfo.imageLinks.thumbnail,
  //   this.state.items.selfLink

  //   in Results Array of Objects

  //   Put Array of objects into State.

  // }



  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };



  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.title) {
      API.googleBooks(this.state.title,
     )
        .then( (res) => { 
            console.log('res from api ', res);
            const mappedResults = res.data.items.map(item=>{
                let book = {};
                book.id =  item.id;
                book.title = item.volumeInfo.title;   //book.title is a string
                book.authors = item.volumeInfo.authors;  ///book.authors is an array
                book.description = item.volumeInfo.description;
                book.image = item.volumeInfo.imageLinks.thumbnail;
                book.link = item.volumeInfo.previewLink;
                return book;
            });
            //now mappedResults has array of objects with data you want
            this.setState({books:mappedResults});
          //this.setState({books : res.data.items.filter(filterItems(res.data.items))} ))
        })
        .catch(err => console.log(err));
    }
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
            {/* <ContainerBookSearch> */}
              <h3>Book Search</h3>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Book Title (required)"
              />
             
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
            {/* </ContainerBookSearch> */}

          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            {/* <ContainerResults> */}
              <h3>Results</h3>      
            {this.state.books.length ? (
              <List>
                 
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                        {/* //? NO EVENT.PREVENTDEFAULT ON AN ONCLICK SUBMIT? ONLY ON A BUTTON?  API CALL? */}
                   <SaveBtn disabled={!(book.id)} onClick={() => this.saveBook(book)} />
                   <ViewBtn disabled={!(book.id)} onClick={() => this.viewBook(book.link)} /> 

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

export default Search;
