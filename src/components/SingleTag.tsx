import { Paper } from "@mui/material";
import React from "react";
import { tag } from "../types";

const SingleTag = ({ tag }: { tag: tag }) => {
  return (
    <Paper
      key={`tag-${tag.id}`}
      sx={{
        p: 1,
        borderRadius: "0",
        cursor: "pointer",
        bgcolor: "#ddd",
        transition: "0.25s",
        mr: 1,
        "&:hover": {
          bgcolor: "#ededed",
        },
      }}
    >
      {tag.label}
    </Paper>
  );
};

export default SingleTag;
