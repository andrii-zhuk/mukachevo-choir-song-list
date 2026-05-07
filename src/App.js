import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, Button, Divider, 
  createTheme, ThemeProvider, Fade, Link 
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import programData from './program.json';
import About from './About';

const theme = createTheme({
  palette: {
    background: { default: '#F4F4F2' },
    primary: { main: '#1A1A1A' },
    secondary: { main: '#C5A059' },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h3: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
  },
});

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVisibility = () => {
      const concertDateTime = new Date(`${programData.eventDate}T${programData.eventTime}`);
      const now = new Date();
      // Показуємо за 1 годину (3600000 мс)
      const isTimeToShow = (concertDateTime - now) <= 3600000;
      setIsVisible(isTimeToShow);
    };

    checkVisibility();
    const timer = setInterval(checkVisibility, 60000); // Перевірка щохвилини
    return () => clearInterval(timer);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Шапка з деталями місця */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>{programData.concertTitle}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {programData.eventDate} • {programData.eventTime}
        </Typography>
        <Link 
          href={programData.venueMapUrl} 
          target="_blank" 
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, textDecoration: 'none', color: 'secondary.main' }}
        >
          <PlaceIcon sx={{ fontSize: '1rem', mr: 0.2 }} />
          <Typography variant="subtitle1" color="text.secondary">
            {programData.eventPlace}<br/>{programData.venue}
          </Typography>
          
        </Link>
      </Box>

      {isVisible ? (
        <Fade in={true} timeout={1000}>
          <Box>
            {programData.items.map((item, id) => (
              <Paper 
                key={id} 
                elevation={0} 
                sx={{ 
                  p: 3, mb: 2, borderRadius: 0, borderLeft: '3px solid', borderColor: 'secondary.main',
                  bgcolor: 'white'
                }}
              >
                <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1.5, color: 'text.secondary' }}>
                  {item.composer}
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', my: 0.5 }}>
                  {item.title}
                </Typography>
                {item.soloist && (
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'secondary.main' }}>
                    Соло: {item.soloist}
                  </Typography>
                )}
              </Paper>
            ))}
          </Box>
        </Fade>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10, border: '1px dashed #ccc' }}>
          <Typography variant="h6" color="text.secondary" sx={{ letterSpacing: 2 }}>
            ПРОГРАМА БУДЕ ДОСТУПНА СКОРО
          </Typography>
          <Typography variant="caption">Завітайте за годину до початку виступу</Typography>
        </Box>
      )}

      <Button 
        variant="contained" 
        fullWidth 
        onClick={() => navigate('/about')}
        sx={{ mt: 4, borderRadius: 0, py: 2, bgcolor: 'primary.main', boxShadow: 0 }}
      >
        ПРО КОЛЕКТИВ
      </Button>
    </Container>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;