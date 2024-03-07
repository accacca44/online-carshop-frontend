import { Card, CardContent, CardActionArea, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function CreateCarListingButton() {
  const navigate = useNavigate();

  return (
    <Card elevation={3} style={{ height: '100%' }}>
      <CardActionArea
        style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => navigate('/create-car-listing')}
      >
        <CardContent>
          <Typography variant="h4" align="center">
            <AddIcon fontSize="large" />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
