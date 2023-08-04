import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ratingActions from "../../store/rating";
import OpenModalButton from "../OpenModalButton";
import ConfirmRatingDeleteModal from "../ConfirmRatingDeleteModal";
import "./UserRating.css";



function UserRatings() {
    const dispatch = useDispatch();
    const ratings = useSelector((state) => state.rating.userRatings);
    const ratingsArr = Object.values(ratings);


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
                <div key={rating.id} style={{border: "1px solid black", padding: "20px", width: "100px"}}>
                    <p>Rating: {rating.rating}</p>
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