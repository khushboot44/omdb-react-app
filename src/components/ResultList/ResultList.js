import React from 'react';
import './result.css';

export default function ResultListComponent({ items }) {
  return (
    <ul>
      {items.map((elem, index) => (
        <ul className="container-heading">
          <li>
            <img src={elem.Poster} className="imageResult" />
          </li>
          <li key={index}>{elem.Title}</li>
        </ul>
      ))}
    </ul>
  );
}
