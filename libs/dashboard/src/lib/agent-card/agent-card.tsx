import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for custom styling
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: 16,
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px 0 rgba(0,0,0,0.16)',
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 24px',
}));

// Props interface
interface AgentCardProps {
  image: string;
  title: string;
  description?: string;
  buttonText: string;
  onButtonClick: () => void;
  imageAlt?: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  image,
  title,
  description,
  buttonText,
  onButtonClick,
  imageAlt = 'Card image',
}) => {
  return (
    <StyledCard>
      <StyledCardMedia
        image={image}
        title={imageAlt}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ padding: 3 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: '1.5rem',
            lineHeight: 1.2,
            marginBottom: 2,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.95rem',
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ padding: 3, paddingTop: 0 }}>
        <Box sx={{ width: '100%' }}>
          <StyledButton
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            onClick={onButtonClick}
          >
            {buttonText}
          </StyledButton>
        </Box>
      </CardActions>
    </StyledCard>
  );
};

export default AgentCard;