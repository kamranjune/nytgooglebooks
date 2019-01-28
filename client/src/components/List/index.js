import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
     
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}


// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function ViewBtn(props) {
  return (
    <form>
      <button className="view-btn" {...props} role="button" tabIndex="0">
      View
    </button>
    </form>
  );
}

export function SaveBtn(props) {
  return (
    <button className="save-btn" {...props} role="submit" tabIndex="0">
      Save
    </button>
  );
}


export function DeleteBtn(props) {
  return (
    <button className="delete-btn" {...props} role="submit" tabIndex="0">
      Delete
    </button>
  );
}