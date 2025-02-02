import { createContext, useState, useContext } from "react";

const CatContext = createContext({
  catsCache: [] as any[],
  setCatsCache: (catsCache: any[]) => {},
});

export const useCatContext = () => {
 return useContext(CatContext);
};

export const CatProvider = (props:any) => {
  const [catsCache, setCatsCache] = useState<any>([]);

  return (
    <CatContext.Provider value={{ catsCache, setCatsCache }}>
      {props.children}
    </CatContext.Provider>
  );
};
