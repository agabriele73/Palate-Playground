import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const recipeFormRedirect = () => {
    history.push("/recipes/new");
    setShowMenu(false);
  }

  const myRecipes = () => {
    history.push("/recipes/my-recipes");
    setShowMenu(false);
  }

  const manageRatings = () => {
    history.push("/my-ratings");
    setShowMenu(false);
  }

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <i className="fa-solid fa-bars" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user && (
          <div className="user-info">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={myRecipes}>My Recipes</button>
            </li>
            <li>
              <button onClick={recipeFormRedirect}>Add a Recipe</button>
            </li>
            <li>
              <button onClick={manageRatings}>Manage Ratings</button>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </div>
        )
        }
      </ul>
    </>
  );
}

export default ProfileButton;
