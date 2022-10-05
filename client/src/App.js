import React,{useEffect} from "react";

import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";

import memories from "./images/memories.png";
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import { useDispatch } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice";
import { useSelector } from "react-redux";

const App = () => {
  const statePost = useSelector(state=>state.posts)
  const isFetching = useSelector(state=>state.posts.loading)
  const dispatch = useDispatch();
   useEffect(()=>{
      dispatch(fetchPosts())
   },[dispatch])
  return (
    <Container maxWidth="lg">
      <AppBar style={{borderRadius:"15", margin:' 0 0 30px 0', display:'flex',
      flexDirection:'row-reverse',justifyContent:'center',alignItens:"center",  
    }} position="static" color="inherit">
        <Typography style={{color:"rgba(0,183,255, 1)"}} variant="h2" align="center">
          Memories
        </Typography>
        <img style={{marginLeft:'15px'}} src={memories} alt="memories" height="60"  />
      </AppBar>
      {isFetching && <p> Loading...</p>}
      
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
                <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
                    <Form />
                </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
