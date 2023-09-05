import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ratingActions from "../../store/rating";
import OpenModalButton from "../OpenModalButton";
import ConfirmRatingDeleteModal from "../ConfirmRatingDeleteModal";
import { FaStar } from 'react-icons/fa'
import "./UserRating.css";



function UserRatings() {
    const dispatch = useDispatch();
    const ratings = useSelector((state) => state.rating.userRatings);
    const ratingsArr = Object.values(ratings);

    const generateStars = (avgRating) => {
        const fullStars = Math.floor(avgRating);
        const decimal = avgRating - fullStars;
        const stars = [];
    
        for (let i = 0; i < fullStars; i++) {
            stars.push({ index: i, color: "#ffc107" });
        }
    
        if (decimal >= 0.25 && decimal <= 0.75) {
            stars.push({ index: fullStars, color: "#ffc107" });
        } else if (decimal > 0.75) {
            stars.push({ index: fullStars, color: "#ffc107" });
        }
    
        for (let i = stars.length; i < 5; i++) {
            stars.push({ index: i, color: "#e4e5e9" });
        }
    
        return stars.map((star) => (
            <FaStar key={star.index} size={30} style={{ color: star.color }} />
        ));
    };


    useEffect(() => {
        dispatch(ratingActions.setRatingsThunk());
    }, [dispatch]);

    return (
        <div className="user-ratings">
            <h1>
                User Ratings
            </h1>
            <div className="ratings">
            {ratingsArr.map((rating) => (
                <div key={rating.id}>
                    {/* <p>Rating: {rating.rating}</p> */}
                    <p>Rating: {generateStars(rating.rating)}</p>
                    <p>Recipe: {rating.recipe}</p>
                    <OpenModalButton 
                        ratingId={rating.id}
                        buttonText={"Remove Rating"}
                        modalComponent={<ConfirmRatingDeleteModal ratingId={rating.id}/>}
                    />
                </div>
            ))}
            </div>
        </div>
    );
}

export default UserRatings;