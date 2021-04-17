import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deleteDeck, listDecks} from "../utils/api/index";




function DecksDisplay() {

     const [decks, setDecks] = useState([]);
    
    useEffect(() => {
        async function loadData() {
            try {
                const data = await listDecks();
                setDecks(data);
            }// end of try
            catch(error) {
                console.log(error)
            }// end of catch
        } // end of loadData()
        loadData();
    },[]) //end of effect


    const handleDelete = ({target}) => {
        const message = window.confirm(`Delete this deck? You will not be able to recover it.`)
        if(message){
                async function deleteData() {
                    try {
                        await deleteDeck(target.value)
                        const data = await listDecks()
                        setDecks(data);
                } catch (error) {
                    console.log(error);
                }
            }
            deleteData();
        }
    }

    if(decks.length > 0) {
        return (
            <div>
                {decks.map((deck) => (
                    <div className="card" key={deck.id}>
                        <div className="card-body">
                            <div className="row">
                                <h5 className="card-title col-9">{deck.name}</h5>
                                <h6 className="col-3">{deck.cards.length} cards</h6>
                            </div>
                            <p className="card-text">{deck.description}</p>
                            <Link to={`/decks/${deck.id}`} className="btn btn-primary">View</Link>
                            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                            <button value={deck.id} onClick={handleDelete} className="btn btn-primary">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    } 
    return("Please add a deck")
 
} 


export default DecksDisplay;

