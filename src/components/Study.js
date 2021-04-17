import React, {useEffect, useState} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {readDeck} from "../utils/api/index";

function Study() {
    const [cards, setCards] = useState({});
    const [deck, setDeck] = useState({});
    const [front, setFront] = useState(true);
    const [cardIndex, setCardIndex] = useState(0);
    const {deckId} = useParams();
    const history = useHistory();


    // effect for reading deck by deckId
    useEffect(() => {
            setCards({});
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

    function flip() {
        setFront(!front);
    }

    function next() {
        if(cardIndex + 1 < cards.length){
            setCardIndex(cardIndex + 1);
            setFront(true);
        } else {
            const result = window.confirm(`Restart cards? Click 'cancel' to return to home page.`);
        
            if(result){
                setCardIndex(0);
                setFront(true);
            } else {
                history.push("/");
            }
        }
    }

    function BreadCrumb() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item" key ="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page" key="2">Study</li>
                </ol>
            </nav>
        )
    }






    if(cards.length > 2) {
        return (
            <div>
                <BreadCrumb/>
                <h2>Study: {deck.name}</h2>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Card {cardIndex + 1} of {cards.length}</h4>
                        <p className="card-text">{front ? `${cards[cardIndex].front}` : `${cards[cardIndex].back}`}</p>
                        <button onClick={flip}>Flip</button>
                        {front ? null : <button onClick={next}>Next</button>}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <BreadCrumb/>
                <h2>Study: {deck.name}</h2>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Not Enough Cards</h4>
                        <p className="card-text">You need at least 3 cards to study. There are {cards.length} cards in this deck. </p>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
                    </div>
                </div>
            </div>
        )
    }




} // end of study component

export default Study;