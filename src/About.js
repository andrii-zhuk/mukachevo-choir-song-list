import React from 'react';
import { Container, Typography, Box, Button, Divider, Stack, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const About = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
        <Button startIcon={<ArrowBackIosNewIcon />} onClick={() => navigate('/')} sx={{ mb: 4, color: 'primary.main' }}>
            Назад
        </Button>

        <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', mb: 2 }}>
            Мукачівський хор хлопчиків та юнаків
        </Typography>
        <Divider sx={{ mb: 4, width: 50, borderColor: '#C5A059' }} />

        <Typography 
            variant="body1" 
            sx={{ 
                lineHeight: 1.8, 
                textAlign: 'justify', 
                mb: 4, 
                color: 'text.primary' 
            }}
        > 
        Колектив є візитівкою стародавнього Мукачева. Заснований у 1983 році. 
        <br/>
        Його творцем незмінним керівником є заслужений діяч мистецтв композитор Володимир Волонтир.
      </Typography>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="overline">Слідкуйте за нами</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
          <IconButton 
            component="a" href="https://facebook.com/yourpage" target="_blank"
            sx={{ color: '#1877F2' }}
          >
            <FacebookIcon fontSize="large" />
          </IconButton>
          <IconButton 
            component="a" href="https://instagram.com/yourpage" target="_blank"
            sx={{ color: '#E4405F' }}
          >
            <InstagramIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
};

export default About;