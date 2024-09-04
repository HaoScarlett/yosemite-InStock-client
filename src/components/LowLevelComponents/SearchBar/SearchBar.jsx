import React from 'react';
import "./SearchBar.scss";
import searchIcon from "../../../assets/Icons/search-24px.svg";




export default function SearchBar() {
    return (
    <div className="search-bar">
        <img className="search-bar__icon" src={searchIcon} alt="search" />
        <input
            className="search-bar__field p2-body-medium"
            type="search"
            name="search"
            placeholder="Search..."
        />
    </div>
  )
}
