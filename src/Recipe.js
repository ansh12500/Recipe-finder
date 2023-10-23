import React from "react";


function Recipe({ title, calories, image, url, source }) {

    return (
        <div className="recipe">
            <h1>{title}</h1>
            <img className="recipe-img" src={image} alt={title} />
            <div className="recipe-info">
                <div className="calories-container">
                    <h3>Calories per serving</h3>
                    <p>{calories}</p>
                </div>
                <div className="ingredients-container">
                    <h3>More Info</h3>
                    <a href={url} target="_blank">{source}</a>
                </div>
            </div>
        </div>
    );
}

export default Recipe;