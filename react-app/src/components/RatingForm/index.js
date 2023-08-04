import React, { useState, useEffect } from "react";
import * as ratingActions from "../../store/rating";
import * as recipeActions from "../../store/recipe";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const RatingForm = ( { recipeId } ) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [hoveredRating, setHoveredRating] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const history = useHistory();

    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleStarClick = (rating) => {
        setSelectedRating(rating);
    };

    const renderRatingInputs = () => {
        return [1, 2, 3, 4, 5].map((rating) => (
            <label key={rating}>
                <input 
                    type="radio"
                    name="rating"
                    value={rating}
                    style={{ display: "none"}}
                    onMouseEnter={() => handleStarHover(rating)}
                    onMouseLeave={() => setHoveredRating(null)}
                    onClick={() => handleStarClick(rating)}
                />
                <FaStar 
                    size={50}
                    style={{
                        cursor: "pointer",
                        color: rating <= (hoveredRating || selectedRating) ? "gold" : "gray",
                    }}
                />
            </label>
        ));
    };

    const renderSelectedRating = () => {
        if (selectedRating !== null) {
            return <p>Selected rating: {selectedRating}</p>;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedRating)
        const newRating = {
            rating: selectedRating
        }
        console.log(newRating)
        await dispatch(ratingActions.postRatingThunk(newRating, recipeId));
        dispatch(ratingActions.setRatingsThunk());
        dispatch(recipeActions.setCurrentRecipeThunk(recipeId));
        closeModal();
    }

    return (
        <div className="confirm-delete">
            <h1>Rating Form</h1>
            <form onSubmit={handleSubmit}>
            {renderRatingInputs()}
            <br/>
            <div style={{ justifyContent: "center", margin: "5px"}}>
            <button type="submit" disabled={selectedRating === null}>
                Submit
            </button>
            <button onClick={closeModal}>Cancel</button>
            </div>
            </form>
            {renderSelectedRating()}
        </div>
    );
};

export default RatingForm;