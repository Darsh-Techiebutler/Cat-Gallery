import React, { useEffect, useState, useMemo } from "react";
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
import { fetchCats } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

const Gallery = () => {
  const { setCats, catsCache, setCatsCache } = useCatContext();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const itemsPerPage = 10;

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get("page");
    if (pageParam) {
      setPage(Number(pageParam));
    }
  }, [location.search]);

  useEffect(() => {
    if (catsCache[page]) {
      setCats(catsCache[page]);
      setLoading(false);
    } else {
      loadCats(page);
    }
  }, [page]);

  const handlePaginationChange = (event: any, value: number) => {
    setPage(value);
    const url = new URL(window.location.href);
    url.searchParams.set("page", value.toString());
    window.history.pushState({}, "", url.toString());
  };

  const loadCats = async (page: number) => {
    setLoading(true);
    const newCats = await fetchCats(page);
    setCats(newCats);
    setCatsCache((prevCache: any) => ({
      ...prevCache,
      [page]: newCats,
    }));

    setLoading(false);
  };

  const handleCardClick = (catId: string) => {
    navigate(`/cat/${catId}`);
  };

  // Use useMemo to memoize totalPages calculation
  const totalPages = useMemo(
    () => Math.ceil(Object.values(catsCache)?.flat().length / itemsPerPage),
    [catsCache]
  );

  return (
    <Container>
      <Box>
        <Grid container spacing={2}>
          {catsCache[page]?.map((cat: any) => (
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
            count={totalPages} // Using memoized totalPages value
            page={page}
            onChange={handlePaginationChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            showFirstButton
            showLastButton
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Gallery;