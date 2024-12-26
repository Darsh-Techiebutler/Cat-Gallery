import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Container,
  Pagination,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useCatContext } from "../context/CatContext";
import { useNavigate, useLocation } from "react-router-dom";

const Gallery = () => {
  const { catsCache, setCatsCache } = useCatContext();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pagenumber = new URLSearchParams(location.search).get("page");
    if (pagenumber) {
      setPage(Number(pagenumber));
    }
  }, [location]);

  const cachedCats = useMemo(() => {
    return catsCache.find((cache: any) => cache.page === page);
  }, [page, catsCache]);

  useEffect(() => {
    if (cachedCats) {
      setCats(cachedCats.data);
      setLoading(false);
    } else {
      const loadCats = async () => {
        setLoading(true);
        fetch(
          `https://api.thecatapi.com/v1/images/search?format=json&limit=10&page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "live_d83g3mKJYHYIyLWkMa2iAYlieCX23DWt9baoQxRLtO5N3i7si6G5bVgWl0YAoPfe",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setCats(data);
            setLoading(false);
            setCatsCache([...catsCache, { page, data }]);
          });
      };
      loadCats();
    }
  }, [page, catsCache, setCatsCache]);

  // useEffect(() => {
  //   console.log("Updated catsCache:", catsCache);
  // }, [catsCache]);

  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
    const url = new URL(window.location.href);
    url.searchParams.set("page", value.toString());
    window.history.pushState({}, "", url.toString());
  };

  const handleCardClick = (catId: any) => {
    navigate(`/cat/${catId}`);
  };

  return (
    <Container>
      <Box>
        <Grid container spacing={2}>
          {cats.map((cat: any) => (
            <Grid item xs={12} sm={6} md={4} key={cat.id}>
              <Card onClick={() => handleCardClick(cat.id)}>
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

        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={10}
            page={page}
            onChange={handlePaginationChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Gallery;
