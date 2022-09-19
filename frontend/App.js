import React from 'react';
import PostList from './PostList';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const ApiUrlContext = React.createContext('localhost');

const defaultApiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [apiUrl, setApiUrl] = React.useState(defaultApiUrl);
  const [apiUrlPrompt, setApiUrlPrompt] = React.useState(defaultApiUrl);
  const [showNewDialog, setShowNewDialog] = React.useState(false);

  return (
    <div className="App">
      <Container fixed>
        <Box display="flex" marginTop={1} marginBottom={1}>
          <TextField
            fullWidth
            value={apiUrlPrompt}
            onChange={(e) => {
              setApiUrlPrompt(e.target.value);
            }}
          />
          <IconButton onClick={() => setApiUrl(apiUrlPrompt)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <ApiUrlContext.Provider value={apiUrl}>
          <PostList
            show={showNewDialog}
            setShowNewRecipeDialog={setShowNewDialog}
          />
        </ApiUrlContext.Provider>
        <Fab
          onClick={() => {
            setShowNewDialog(true);
          }}
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
          }}
        >
          <AddIcon />
        </Fab>
      </Container>
    </div>
  );
}

export default App;
