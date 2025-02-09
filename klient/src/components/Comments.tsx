import React, { useContext, useEffect, useState } from "react";
import { UserLoggedContext } from "../App";
import Comment from "./ModyfiableComment";
import Modyfiableomment from "./ModyfiableComment";
import ModyfiableComment from "./ModyfiableComment";
import { CategoryButton } from "../styles/ButtonStyles";
import styled from "styled-components";

interface CommentProps {
  productid: Number;
}

type CommentType = {
  userid: String;
  username: String;
  rating: Number;
  body: String;
  date: Date;
};

const Comments = ({ productid }: CommentProps) => {
  const userContext = useContext(UserLoggedContext)!;
  const { userLoggedID, setUserLoggedID } = userContext;

  /*STATES*/
  const [comments, setComments] = useState<CommentType[]>([]);
  const [thisUserCommented, setThisUserCommented] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  let commentAltered = 0;
  /*STATES*/

  useEffect(() => {
    if (userLoggedID) {
      fetch(
        `http://localhost:5000/product-comments/${productid}/${userLoggedID}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setThisUserCommented(true);
          }
        })
        .catch((error) => {
          console.error("This user has no comments:", error);
        });
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/product-comments/${productid}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data); // Update the products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [thisUserCommented, commentAltered]);

  const commentDeleted = (userid: string) => {
    setComments((prevComments) =>
      prevComments?.filter((comment) => comment.userid !== userid)
    );
  };

  return (
    <div>
      {userLoggedID && !thisUserCommented && (
        <CategoryButton
          fontsize="1vw"
          padding="1vh"
          background_color="pink"
          onClick={() => {
            setAddingComment(true);
          }}
        >
          Add your own comment
        </CategoryButton>
      )}

      {userLoggedID && !thisUserCommented && addingComment && (
        <ModyfiableComment
          productid={productid}
          commentAdded={() => {
            setThisUserCommented(true);
            setAddingComment(false);
          }}
        />
      )}
      {comments &&
        comments.map((item, key) => (
          <Comment
            userid={item.userid}
            productid={productid}
            username={item.username}
            body={item.body}
            rating={item.rating}
            commentDeleted={(userid: string) => {
              if (userLoggedID === userid) {
                setThisUserCommented(false);
              }
            }}
            commentAltered={(newBody: string) => {
              commentAltered += 1;
            }}
          />
        ))}
    </div>
  );
};

export default Comments;
