import React, { useState, useEffect } from "react";
import * as ratingActions from "../../store/rating";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { useModal } from "../../context/Modal";
const RatingForm = () => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [hoveredRating, setHoveredRating] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleStarClick = (rating) => {
        setSelectedRating(rating);
    };

    return (
        <div>
            <h1>Rating Form</h1>
            <form>
                {[1, 2, 3, 4, 5].map((rating) => (
                    <label>
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
                ))}
            </form>
            {selectedRating !== null && <p>Selected rating: {selectedRating}</p>}
            <button type="submit" disabled={selectedRating === null}>
                Submit
            </button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default RatingForm;