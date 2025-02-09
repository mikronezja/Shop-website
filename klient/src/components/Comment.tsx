import React, { useContext, useState } from "react";
import { UserLoggedContext } from "../App";
import { CategoryButton } from "../styles/ButtonStyles";

interface CommentProps {
  userid: string;
  productid: number;
  username: string;
  body: string;
  rating: number;
  date: string;
  userCommented: React.Dispatch<React.SetStateAction<boolean>>;
  commentDeleted: (userid: String) => void;
  commentAltered: (newBody: String) => void;
}

const Comment = ({
  userid,
  productid,
  username,
  body,
  rating,
  date,
  commentDeleted,
  commentAltered,
}: CommentProps) => {
  /*CONTEXTS*/
  // CURRENT LOGGED USER
  const userContext = useContext(UserLoggedContext)!;
  const { userLoggedID, role } = userContext;
  const [alteredBody, setALteredBody] = useState("");
  const [isAlteringBody, setIsAlteringBody] = useState(false);
  /*CONTEXTS*/

  const alterBody = async (newBody: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/product-comments/${productid}/${userLoggedID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: newBody }),
        }
      );

      if (response.ok) {
        commentAltered(newBody);
      } else {
        alert("Failed to update the comment.");
      }
    } catch (error) {
      console.error("Error updating the comment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div>{rating}</div>
      <div>{username}</div> <div>{rating}</div>
      <div>{body}</div>
      {(role === "admin" || userLoggedID === userid) && (
        <div>
          <h3>{username}</h3> <div>{rating.toString()}</div>
          <div>{new Date(date).toLocaleDateString()}</div>
          {!isAlteringBody && <div>{body}</div>}
          {(role === "admin" || userLoggedID === userid) && !isAlteringBody && (
            <CategoryButton
              fontsize="1.5vw"
              padding="0.5vh"
              background_color="pink"
              onClick={() => {
                fetch(
                  `http://localhost:5000/product-comments/${productid}/${userid}`,
                  {
                    method: "DELETE",
                  }
                )
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error("Failed to delete the comment.");
                    }
                    return res.json();
                  })
                  .then(() => {
                    commentDeleted(userid);
                  })
                  .catch((error) => {
                    console.error("Error deleting the comment:", error);
                  });
              }}
            >
              delete comment
            </CategoryButton>
          )}
          {userLoggedID === userid && !isAlteringBody && (
            <CategoryButton
              fontsize="1.5vw"
              padding="0.5vh"
              background_color="pink"
              onClick={() => {
                setALteredBody(body);
                setIsAlteringBody(true);
              }}
            >
              Alter
            </CategoryButton>
          )}
          {userLoggedID === userid && isAlteringBody && (
            <div>
              <textarea
                onChange={(e) => {
                  setALteredBody(e.target.value);
                }}
                value={alteredBody}
              ></textarea>
              <button
                onClick={() => {
                  alterBody(alteredBody);
                  // commentAltered invoked in alterBody
                  setIsAlteringBody(false);
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
