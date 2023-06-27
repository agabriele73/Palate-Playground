import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import  OpenModalButton  from "../OpenModalButton";
import ConfirmCommentDelete from "../ConfirmCommentDelete";

function CommDeleteEditModal() {
    return (
        <div>
            <OpenModalButton 
                buttonText={<FontAwesomeIcon icon={faTrash} />}
                modalComponent={<ConfirmCommentDelete />}
            />
            <OpenModalButton  
                buttonText={<FontAwesomeIcon icon={faEdit} />}
            />
        </div>
    );
}

export default CommDeleteEditModal;