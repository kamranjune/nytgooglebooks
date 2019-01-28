import React from "react";
// import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">Google Books</a>
      {/* react-router links not needed here because not part of a render()
      must think of render as a css display of components that often need
      special packages to create html type elements in the css type components render of react.
      just a way of viewing it separate from the rendering of html.
      <Link to={"/"}>Search</Link>
      <Link to={"/saved"}>Saved</Link> */}
      <a className="navbar-brand" href="/">Search</a>
      <a className="navbar-brand" href="/saved">Saved</a>
    </nav>
  );
}

export default Nav;
