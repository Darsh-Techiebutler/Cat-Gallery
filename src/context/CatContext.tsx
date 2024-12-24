import React, { createContext, useState, useContext } from "react";

const CatContext = createContext<any>(undefined);

export const useCatContext = () => {
  const context = useContext(CatContext);
  return context;
};

export const CatProvider = (props: { children: any }) => {
  const [cats, setCats] = useState([]);
  const [catsCache, setCatsCache] = useState({});

  return (
    <CatContext.Provider value={{ cats, setCats, catsCache, setCatsCache }}>
      {props.children}
    </CatContext.Provider>
  );
};
