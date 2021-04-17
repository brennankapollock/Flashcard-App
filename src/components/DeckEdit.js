import React, {useState, useEffect} from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import {readDeck, updateDeck} from "../utils/api/index";
import DeckForm from "./Forms/DeckForm"


function DeckEdit() {
    const initialState = { name: "", description: "" };
    const [deck, setDeck] = useState({...initialState});
    const {deckId} = useParams();
    const history = useHistory();
    

   useEffect(() => {
            
            async function loadData() {
                try {
                    const data = await readDeck(deckId);
                    setDeck(data)
                    }
                catch(error) { 
                    console.log(error) 
                }
            }
        loadData();
    },[deckId])    

    const handleChange = ({target}) => {
        setDeck({...deck, [target.name]: target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateData() {
            try {
                await updateDeck(deck);
                history.push(`/decks/${deckId}`)
            } catch (error){
                console.log(error)
            }
        }
        updateData();
    }


    function BreadCrumb() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item" key ="1"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page" key="2">Edit</li>
                </ol>
            </nav>
        )
    }


 return (
     <div>
        <BreadCrumb/>
        <h2>Edit Deck</h2>
        <form onSubmit={handleSubmit}>
            <DeckForm handleChange={handleChange} formData={deck}/>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>

 )

}

export default DeckEdit;