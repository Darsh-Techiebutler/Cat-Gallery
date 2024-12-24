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
  const [cat, setCat] = useState<any>(null); // State to hold the cat details
  const navigate = useNavigate();

  useEffect(() => {
    if (catId) {
      const cachedCat = Object.values(catsCache)
        .flat()
        .find((cat: any) => cat.id === catId);
      if (cachedCat) {
        setCat(cachedCat);
      } else {
        navigate("/");
      }
    }
  }, [catId, catsCache, navigate]);

  if (!cat) {
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
          backgroundColor: "#f9f9f9", // Soft background color
          borderRadius: 2,
          boxShadow: 2,
          p: 3, // Padding for the whole content box
        }}
      >
        <Card
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: 6,
            },
          }}
        >
          <CardMedia
            component="img"
            alt="Cat"
            height="300"
            image={cat.url}
            title="Cat Image"
            sx={{
              objectFit: "cover",
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
            }}
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              Cat ID: {cat.id}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Width: {cat.width}px, Height: {cat.height}px
            </Typography>
          </CardContent>
        </Card>

        <Button
          sx={{
            mt: 3,
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: 500,
            backgroundColor: "#1976d2", // Primary color
            color: "#fff",
            borderRadius: 3,
            boxShadow: 2,
            "&:hover": {
              backgroundColor: "#1565c0", // Darker shade on hover
              boxShadow: 4,
            },
          }}
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default CatDetails;
