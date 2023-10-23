import React from "react";
import { useEffect, useState } from "react";
import './App.css';
import Attribution from "./Attribution";
import Default from "./Default";
import Recipe from "./Recipe";
import Pagination from './Pagination';

function Home() {
    const APP_ID = ""; // YOUR_APP_ID
    const APP_KEY = ""; // YOUR_APP_KEY

    // Search
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    // Calories Filter
    const [filterFrom, setFilterFrom] = useState(0);
    const [filterTo, setFilterTo] = useState(9000);
    const [filter, setFilter] = useState(`0-9000`);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(10);

    useEffect(async () => {
        GET_RECIPES();
    }, [query, filter]);

    // Search
    const GET_RECIPES = async () => {
        const RESPONCE = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&calories=${filter}&to=100`);
        const DATA = await RESPONCE.json();
        setRecipes(DATA.hits);
    };

    const UPDATE_SEARCH = event => {
        setSearch(event.target.value);
    };

    const GET_SEARCH = event => {
        event.preventDefault();
        setQuery(search);
    };

    // Calories Filter
    const UPDATE_FILTER_FROM = event => {
        event.preventDefault();
        setFilterFrom(event.target.value);
    };

    const UPDATE_FILTER_TO = event => {
        event.preventDefault();
        setFilterTo(event.target.value);
    };

    const UPDATE_FILTER = event => {
        event.preventDefault();
        setFilter(`${filterFrom}-${filterTo}`);
    };

    const SHOW_FILTERS = () => {
        let x = document.getElementById("calories-filter");
        if (x.style.display === "none") {
            x.style.display = "flex";
        } else {
            x.style.display = "none";
        }
    };

    // Pagination

    // Get current recipes
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipe = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (!(query === "")) {
        return (
            <div className="Home">
                <div className="title">
                    <a href="/"><h1>Recipes Finder</h1></a>
                </div>
                <form onSubmit={GET_SEARCH} className="search-form">
                    <input className="search-bar" type="text" placeholder="Type ingredients separated by spaces" value={search} onChange={UPDATE_SEARCH} />
                    <button className="search-button" type="submit">Search</button>
                </form>
                <div className="filters">
                    <p onClick={SHOW_FILTERS}>Filters</p>
                    <form onSubmit={UPDATE_FILTER}  id="calories-filter" className="search-form-filters">
                        <p>Calories: </p>
                        <input className="search-filter" type="number" step="100" min="0" max="9000" placeholder="From" value={filterFrom} onChange={UPDATE_FILTER_FROM} />
                        <input className="search-filter" type="number" step="100" min="0" max="9000" placeholder="To" value={filterTo} onChange={UPDATE_FILTER_TO} />
                        <button className="button-filter" type="submit">Update</button>
                    </form>
                </div>
                <div className="recipe-container">
                    {currentRecipe.map((recipe) => (
                        <Recipe
                            title={recipe.recipe.label}
                            calories={Math.round((recipe.recipe.calories / recipe.recipe.yield))}
                            image={recipe.recipe.image}
                            key={recipe.recipe.title}
                            url={recipe.recipe.url}
                            source={recipe.recipe.source}
                        />
                    ))}
                </div>
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={recipes.length}
                    paginate={paginate}
                />
                <Attribution></Attribution>
            </div>

        );
    } else {
        return (
            <div className="App">
                <div className="title">
                    <a href="/"><h1>Recipes Finder</h1></a>
                </div>
                <form onSubmit={GET_SEARCH} className="search-form">
                    <input className="search-bar" type="text" placeholder="Type ingredients separated by spaces or a recipe" value={search} onChange={UPDATE_SEARCH} />
                    <button className="search-button" type="submit">Search</button>
                </form>
                <div className="recipe-container">
                    <Default />
                </div>
                <Attribution></Attribution>
            </div>
        )
    }
}

export default Home;
