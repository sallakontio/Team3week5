import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function CreateNewRecipeDialog({
  show,
  handleClose,
  handleSubmit,
}) {
  const headerRef = React.useRef();
  const introRef = React.useRef();
  const recipeRef = React.useRef();
  const imageUrl = React.useRef();
  const authorRef = React.useRef();

  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Add a new recipe</DialogTitle>
        <DialogContent>
          <TextField
            label="Recipe header"
            variant="outlined"
            fullWidth
            inputRef={headerRef}
          />
          <TextField
            label="Intro"
            variant="outlined"
            inputRef={introRef}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            inputRef={recipeRef}
            label="Recipe (supports markdown)"
            fullWidth
            auto
            multiline
            minRows={4}
            sx={{ marginTop: 2 }}
          />
          <TextField
            inputRef={imageUrl}
            label="Image URL"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            inputRef={authorRef}
            label="Author"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              const newRecipe = {
                header: headerRef.current.value,
                intro: introRef.current.value,
                recipe: recipeRef.current.value,
                imageUrl: imageUrl.current.value,
                author: authorRef.current.value,
              };
              if (
                Object.values(newRecipe).some((value) => value.length === 0)
              ) {
                alert('No empty values allowed');
                return;
              }
              handleClose();
              handleSubmit(newRecipe);
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
