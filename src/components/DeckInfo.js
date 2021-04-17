import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import {readDeck, deleteCard, deleteDeck, listDecks, updateDeck } from "../utils/api/index";


function DeckInfo(){
    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();

    useEffect(() => {
            async function loadData() {
                try {
                    const data = await readDeck(deckId);
                    setDeck(data)
                    setCards(data.cards)
                    }
                catch(error) { 
                    console.log(error) 
                }
            }
        loadData();
    },[deckId])






   const handleCardDelete = ({target}) => {
        const message = window.confirm(`Delete this card? You will not be able to recover it.`)
        if(message){
                async function deleteData() {
                    try {
                        await deleteCard(target.value)
                        .then(updateDeck(deckId))
                        .then(window.location.reload());
                } catch (error) {
                    console.log(error);
                }
            }
            deleteData();
        }
    }

     const handleDeckDelete = ({target}) => {
        const message = window.confirm(`Delete this deck? You will not be able to recover it.`)
        if(message){
                async function deleteData() {
                    try {
                        await deleteDeck(target.value)
                        const data = await listDecks()
                        setDeck(data);
                } catch (error) {
                    console.log(error);
                }
            }
            deleteData();
        }
    }

     function BreadCrumb() {
            return (
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="2">{deck.name}</li>
                    </ol>
                </nav>
            )
        }

    return (

        <div>
            <BreadCrumb/>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-primary">Edit</Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
            <button onClick={handleDeckDelete} value={deck.id} className="btn btn-primary">Delete</button>
            <br/>
            <br/>
            <h2>Cards</h2>
            {cards.map((card) => (
                <div className="card" key={card.id}>
                    <p className="card-text">{card.front}</p>
                    <p className="card-text">{card.back}</p>
                        <Link  to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-primary">Edit</Link>
                        <button onClick={handleCardDelete} value={card.id} className="btn btn-primary">Delete</button>
                </div>
            ))}

        </div>
    )



}

export default DeckInfo;