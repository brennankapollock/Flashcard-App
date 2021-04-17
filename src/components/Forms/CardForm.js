import React from "react";

function CardForm({formData, handleChange, handleSubmit}) {

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="front">
                Front
            <br/>
                <textarea id="front" name="front"  value={formData.front} onChange={handleChange}></textarea>
            </label>
            <br/>
            <label htmlFor="back">
                Back
            <br/>
                <textarea id="back" name="back" value={formData.back} onChange={handleChange}></textarea>
            </label>
            <br/>
        </form>
        
    )
}

export default CardForm;