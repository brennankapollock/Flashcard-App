import React from "react";

function DeckForm({formData, handleChange, handleSubmit}) {

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                Name
            <br/>
                <input type="text" id="name" name="name" onChange={handleChange} value={formData.name}></input>
            </label>
            <br/>
            <label htmlFor="description">
                Description
            <br/>
                <textarea id="description" name="description" onChange={handleChange} value={formData.description}></textarea>
            </label>
            <br/>
        </form>
            
            
            
        
    )
}

export default DeckForm;
