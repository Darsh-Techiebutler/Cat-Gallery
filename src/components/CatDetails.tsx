import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCatContext } from "../context/CatContext";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";

const CatDetails = () => {
  const { catId } = useParams();
  const { catsCache } = useCatContext();
  const [cat, setCat] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (catId) {
      const cachedCat = catsCache.flat().find((cat: any) => cat.id === catId);
      if (cachedCat) {
        setCat(cachedCat);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [catId, catsCache]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "100%" }}>
          <CardMedia
            component="img"
            alt="Cat"
            height="300"
            image={cat.url}
            title="Cat Image"
          />
          <CardContent>
            <Typography variant="h6" component="div">
              Cat ID: {cat.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Width: {cat.width}px, Height: {cat.height}px
            </Typography>
          </CardContent>
        </Card>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default CatDetails;
