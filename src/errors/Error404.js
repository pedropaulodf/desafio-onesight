import React from "react";
import { Link } from "react-router-dom";
import css from './Error404.module.css';

export default function Error404() {
  return (
    <div className={css.container}>
      <h1>Error 404!</h1>
      <h2>Page not found!</h2>
      <Link to="/">Click to go back</Link>
    </div>
  );
}
