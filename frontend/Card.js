import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DeleteOutline } from '@mui/icons-material';
import MuiMarkdown from 'mui-markdown';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({
  id,
  title,
  recipe,
  imageUrl,
  author,
  date,
  isFavorite,
  intro,
  handleToggleFavorite,
  handleDelete,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {author[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            onClick={() => {
              handleDelete(id);
            }}
          >
            <DeleteOutline />
          </IconButton>
        }
        title={title}
        subheader={date}
      />
      <CardMedia component="img" height="194" image={imageUrl} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {intro}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            handleToggleFavorite(id);
          }}
        >
          <FavoriteIcon color={isFavorite ? 'primary' : 'default'} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <MuiMarkdown>{recipe}</MuiMarkdown>
        </CardContent>
      </Collapse>
    </Card>
  );
}
