import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import CatDatalist from "../ApiServices/ApiFetchResponses";

export const Catlist = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    CatDatalist().then((data) => {
      setCats(data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />{" "}
        <Typography variant="h6" component="div">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {cats.map((cat: any) => (
          <Grid item xs={12} sm={6} md={4} key={cat.id}>
            <Card>
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
