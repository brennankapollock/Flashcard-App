import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import {createCard, readDeck} from "../utils/api/index";
import CardForm from './Forms/CardForm';

function NewCard(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState([]);
    const initialState = { front: "", back: "" }
    const [formData, setFormData] = useState({...initialState})
  


    useEffect(() => {
        async function loadData(){
            const data = await readDeck(deckId)
            setDeck(data);
        }
        loadData();
    }, [deckId])

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        async function createNewCard(){
            try {
                await createCard(deckId, formData);
                setFormData({...initialState})
            } 
            catch (error) {
                console.log(error)
            }
        }
        createNewCard();
    }

    function BreadCrumb() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item" key ="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page" key="2">Add Card</li>
                </ol>
            </nav>
        )
    }


    return (
        <div>
            <BreadCrumb/>
            <h2>{deck.name}: Add Cards</h2>
            <CardForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
            <Link to={`/decks/${deckId}`} className="btn btn-primary">Done</Link>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>
    )

}

export default NewCard;