import React, { useEffect, useState } from "react";

import { Container, AppBar, Typography } from "@mui/material";
import NewMemoryButton from "./components/NewMemoryButton/NewMemoryButton";

import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice";
import classes from "./app.module.css";

const App = () => {
  const [displayFormModal, setDisplayFormModal] = useState(false)
  const isFetching = useSelector((state) => state.posts.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      {displayFormModal && <Form 
        onBackgroundClick={()=>{setDisplayFormModal(!displayFormModal)}}
      />}
      <AppBar
        style={{
          borderRadius: "15",
          margin: " 0 0 30px 0",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItens: "center",
        }}
        position="static"
        color="inherit"
      >
        <Typography
          style={{ color: "rgba(0,183,255, 1)" }}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          style={{ marginLeft: "15px" }}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      {isFetching && <p> Loading...</p>}
      <div className={classes.main}>
        <div className={classes.cards}>
          <Posts />
        </div>
       
      </div>
      <div className={classes.uploadButton}>
        <NewMemoryButton onClick={()=>{setDisplayFormModal(!displayFormModal)}} />
      </div>
    </Container>
  );
};

export default App;
