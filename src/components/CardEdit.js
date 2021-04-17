import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import {readDeck, readCard, updateCard} from "../utils/api/index";
import CardForm from "./Forms/CardForm";

function CardEdit() {
    const {deckId, cardId} = useParams();
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});
    const history = useHistory();

    useEffect(() => {
        async function loadData() {
            try {
                const deckData = await readDeck(deckId);
                const cardData = await readCard(cardId);
                setDeck(deckData);
                setCard(cardData);
            } catch (error) {
                console.log(error);
            }
        }
        loadData();
    }, [deckId, cardId])

    const handleChange = ({target}) => {
        setCard({...card, [target.name]: target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateCardData(){
            try {
                await updateCard(card)
            history.push(`/decks/${deckId}`)
            } catch (error) {
                console.log(error)
            }
        }
        updateCardData();
    }

return (
     <div>
        <h2>Edit Card</h2>
            <CardForm handleChange={handleChange} formData={card} handleSubmit={handleSubmit}/>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>

 )

}

export default CardEdit;