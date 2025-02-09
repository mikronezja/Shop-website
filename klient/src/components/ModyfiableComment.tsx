import React, { FormEvent, useContext, useState } from "react";
import { UserLoggedContext } from "../App";
import styled from "styled-components";

interface CommentProps {
  productid: Number;
  commentAdded: () => void;
}

const SameVertically = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HorizontalElements = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModyfiableComment = ({ productid, commentAdded }: CommentProps) => {
  const userContext = useContext(UserLoggedContext)!;
  const { userLoggedID, username } = userContext;
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>("");

  const handlePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/product-comments/${productid}/${userLoggedID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: userLoggedID,
            username: username,
            body: text,
            rating: rating,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Comment added successfully:", result);
        alert("Comment added successfully!");
        commentAdded();
        setRating(5);
        setText("");
      } else {
        console.error("Failed to add comment:", response.statusText);
        alert("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <SameVertically>
        <form onSubmit={handlePost}>
          <HorizontalElements>
            <label>Rating (0-10):</label>
            <input
              type="number"
              value={rating}
              onChange={(e) =>
                setRating(Math.min(Math.max(+e.target.value, 0), 10))
              }
              required
            />
            <label>Comment:</label>
          </HorizontalElements>

          <HorizontalElements>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
          </HorizontalElements>

          <button
            type="submit"
            disabled={
              !Number.isInteger(rating) || rating < 0 || rating > 10 || !text
            }
          >
            POST
          </button>
        </form>
      </SameVertically>
    </div>
  );
};

export default ModyfiableComment;
