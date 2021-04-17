import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import DeckForm from "./Forms/DeckForm";
import {createDeck} from "../utils/api/index";

function CreateDeck() {
    const initialState = {name: "", description: ""}
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value})

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateData(){
            try{
                const data = await createDeck(formData);
                history.push(`/decks/${data.id}`);
            } catch (error){
                console.log(error);
            }
        }
        updateData();
    }


    function BreadCrumb() {
            return (
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" key="0"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page" key="2">Create Deck</li>
                    </ol>
                </nav>
            )
        }


    return (
        <div>
            <BreadCrumb/>
            <h2>Create Deck</h2>
                <DeckForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
                <Link to="/" className="btn btn-secondary">Cancel</Link>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    )
}


export default CreateDeck;