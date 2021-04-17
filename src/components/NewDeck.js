import React from "react";
import {Link} from "react-router-dom";

function NewDeck() {
    return <Link to={`/decks/new`} className="btn btn-primary">Create Deck</Link>

}

export default NewDeck;