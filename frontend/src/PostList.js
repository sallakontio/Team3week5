import React from 'react';
import Card from './Card';
import Stack from '@mui/material/Stack';
import { ApiUrlContext } from './App';
import { fetcher } from './useApi';
import useSWRImmutable from 'swr/immutable';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Alert } from '@mui/material';
import CreateRecipe from './CreateRecipe';

let postId = 0;
const getId = () => ++postId;

const getRandomImageUrl = async () => {
  const response = await fetch(``);
  return response.url;
};

const mockedPosts = [
  {
    id: getId(),
    header: 'Kermainen kanapasta',
    recipe: 'Lorem ipsum i dolor sit amet',
    author: 'alex',
    date: '20.06.2022',
    imageUrl: `https://source.unsplash.com/random/?sig=1/&chicken,pasta`,
    isFavorite: false,
  },
  {
    id: getId(),
    header: 'Lasagne',
    recipe: 'Lorem ipsum i dolor sit amet',
    author: 'alex',
    date: '20.06.2022',
    imageUrl: `https://source.unsplash.com/random/?sig=2/&cooking,lasagne`,
    isFavorite: false,
  },
  {
    id: getId(),
    header: 'Hampurilainen',
    recipe: 'Lorem ipsum i dolor sit amet',
    author: 'alex',
    date: '20.06.2022',
    imageUrl: `https://source.unsplash.com/random/?sig=3/&hamburger`,
    isFavorite: false,
  },
  {
    id: getId(),
    header: 'Kebab',
    recipe: 'Lorem ipsum i dolor sit amet',
    author: 'alex',
    date: '20.06.2022',
    imageUrl: `https://source.unsplash.com/random/?sig=4/&kebab`,
    isFavorite: false,
  },
];

// eslint-disable-next-line no-unused-vars
const getMockedPosts = async () => {
  const urls = await Promise.all(
    Array.from({ length: mockedPosts.length }).map(getRandomImageUrl)
  );
  return mockedPosts.map((post, i) => {
    return {
      ...post,
      imageUrl: urls[i],
    };
  });
};

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const persistToggleRecipe = async (apiUrl, id) => {
  await fetch(apiUrl + '/toggle-favorite/' + id, {
    method: 'POST',
  });
};

const persistDeleteRequest = async (apiUrl, id) => {
  await fetch(apiUrl + '/recipe/' + id, {
    method: 'DELETE',
  });
};

const persistRecipe = async (apiUrl, recipe) => {
  await fetch(apiUrl + '/recipe', {
    method: 'POST',
    body: JSON.stringify(recipe),
  });
};

const useRecipes = () => {
  const apiUrl = React.useContext(ApiUrlContext);
  const [recipes, setRecipes] = React.useState(mockedPosts);

  const { data, error } = useSWRImmutable(apiUrl, fetcher, {
    shouldRetryOnError: false,
  });
  React.useEffect(() => {
    if (data) {
      setRecipes(data.data);
    }
  }, [data, apiUrl]);
  return {
    recipes: recipes,
    isLoading: !data && !error,
    error,
    handleToggleFavorite: (id) => {
      const newRecipes = clone(recipes);
      const recipe = newRecipes.find((recipe) => recipe.id === id);
      recipe.isFavorite = !recipe.isFavorite;
      setRecipes(newRecipes);
      persistToggleRecipe(apiUrl, id);
    },
    handleDelete: (id) => {
      const newRecipes = clone(recipes);
      const recipeIndex = newRecipes.findIndex((recipe) => recipe.id === id);
      newRecipes.splice(recipeIndex, 1);
      setRecipes(newRecipes);
      persistDeleteRequest(apiUrl, id);
    },
    handleAddRecipe: ({ header, intro, recipe, imageUrl, author }) => {
      const newRecipes = clone(recipes);
      const newRecipe = {
        id: newRecipes.length + 1,
        header,
        recipe,
        author,
        date: '20.06.2022',
        imageUrl,
        isFavorite: false,
        intro,
      };
      newRecipes.push(newRecipe);
      setRecipes(newRecipes);
      persistRecipe(apiUrl, newRecipe);
    },
  };
};

const PostList = ({ show, setShowNewRecipeDialog }) => {
  const handleClose = () => {
    setShowNewRecipeDialog(false);
  };
  const request = useRecipes();
  if (request.isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <CreateRecipe
        handleClose={handleClose}
        show={show}
        handleSubmit={request.handleAddRecipe}
      />
      {request.error ? (
        <Box marginTop={2} marginBottom={2}>
          <Alert severity="error">
            Failed to connect to the server. Shown data is mocked.
          </Alert>
        </Box>
      ) : null}

      <Stack spacing={2}>
        {request.recipes.map((recipe) => {
          return (
            <Card
              key={recipe.id + recipe.header}
              title={recipe.header}
              recipe={recipe.recipe}
              author={recipe.author}
              date={recipe.date}
              id={recipe.id}
              imageUrl={recipe.imageUrl}
              isFavorite={recipe.isFavorite}
              intro={recipe.intro}
              handleToggleFavorite={request.handleToggleFavorite}
              handleDelete={request.handleDelete}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default PostList;
