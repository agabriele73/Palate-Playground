import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ratingActions from "../../store/rating";



function UserRatings() {
    const dispatch = useDispatch();
    const ratings = useSelector((state) => state.rating.userRatings);
    const ratingsArr = Object.values(ratings);


    useEffect(() => {
        dispatch(ratingActions.setRatingsThunk());
    }, [dispatch]);

    return (
        <div>
            <h1>
                User Ratings
            </h1>
            {ratingsArr.map((rating) => (
                <div key={rating.id} style={{border: "1px solid black", padding: "10px", margin: "10px", width: "100px"}}>
                    <p>Rating: {rating.rating}</p>
                    <p>{rating.recipe}</p>
                    <button>remove rating</button>
                </div>
            ))}
        </div>
    );
}

export default UserRatings;