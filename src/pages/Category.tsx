import React, { useEffect, useState } from "react";
import { Typography, TextField, Slide } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import FormBox from "../components/FormBox";
import { useAppStore } from "../components/store";
import { createCategory, getCategories } from "../api/categories";

export default function Category() {
  const { store, setStore } = useAppStore();
  const [category, setCategory] = useState<string>("");

  const handleCreateCategory = async () => {
    if (category) {
      await createCategory(category);
      setCategory("");
    }
  };
  const setAllCategories = async () => {
    const categories = await getCategories();
    console.log(`cats long ${categories[0].categoryId}`);
    const simpleCategories = categories.map((cat: any) => {
      return {
        category: cat.category,
        categoryId: cat.categoryId,
      };
    });
    console.log(`shortened ${simpleCategories[0].categoryId}`);
    setStore({ ...store, categories: simpleCategories });
  };

  useEffect(() => {
    if (store.loggedIn) {
      setAllCategories();
    }
    // eslint-disable-next-line
  }, [store.loggedIn]);

  return (
    <Slide
      direction="up"
      timeout={300}
      in={store.loggedIn}
      mountOnEnter
      unmountOnExit
    >
      <FormBox component="form">
        <Typography variant="h2" component="div" gutterBottom>
          Add category
        </Typography>
        <TextField
          value={category}
          // eslint-disable-next-line
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        />
        <LoadingButton
          onClick={handleCreateCategory}
          endIcon={<SendIcon />}
          loading={false}
          loadingPosition="end"
          variant="contained"
        >
          Create new category
        </LoadingButton>
      </FormBox>
    </Slide>
  );
}
