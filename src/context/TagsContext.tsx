import React, { ReactNode, useState, useEffect } from "react";
import { tag } from "../types";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../Hooks/useLocalStorage";

type valueType = {
  tags: tag[];
  addTag: (tagName: string) => void;
};

const TagsContext = React.createContext<valueType>({} as valueType);

export function useTags() {
  return React.useContext(TagsContext);
}

export function TagProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useLocalStorage<tag[]>("tags", []);

  function addTag(tagName: string) {
    setTags((prev) => [...prev, { label: tagName, id: uuidv4() }]);
  }

  const value = {
    tags,
    addTag,
  };

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
}
