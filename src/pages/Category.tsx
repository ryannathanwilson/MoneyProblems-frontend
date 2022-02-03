import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper, Typography, TextField, Slide, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppStore } from "../components/store";
import Container from "../components/Container";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../api/categories";

export default function Category() {
  const { store, setStore } = useAppStore();
  const [category, setCategory] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [catUpdate, setCatUpdate] = useState<string>("");
  const [catUpdateId, setCatUpdateId] = useState<string>("");

  const handleOpenModal = (categoryToUpdate: string, categoryId: string) => {
    setCatUpdateId(categoryId);
    setCatUpdate(categoryToUpdate);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCatUpdate("");
  };

  const handleUpdateCategory = async () => {
    const updatedCategory = await updateCategory(catUpdateId, catUpdate);
    const index = store.categories.findIndex(
      (cat) => cat.categoryId === catUpdateId
    );

    const updatedCategoryList = store.categories;
    updatedCategoryList[index] = updatedCategory;
    setStore({
      ...store,
      categories: updatedCategoryList,
    });
    setOpen(false);
  };

  const handleCreateCategory = async () => {
    if (category) {
      const newCategory = await createCategory(category);
      setStore((prevStore) => {
        prevStore.categories.push({
          category: newCategory.category,
          categoryId: newCategory.categoryId,
        });
        return {
          ...prevStore,
          categories: prevStore.categories,
        };
      });
      setCategory("");
    }
  };
  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategory(categoryId);
    const updatedCategoryList = store.categories.filter(
      (cat) => cat.categoryId !== categoryId
    );
    setStore({
      ...store,
      categories: updatedCategoryList,
    });
  };

  return (
    <Slide
      direction="up"
      timeout={300}
      in={store.loggedIn}
      mountOnEnter
      unmountOnExit
    >
      <Container
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateCategory();
        }}
        component="form"
      >
        <Typography variant="h2" component="div" gutterBottom>
          Add category
        </Typography>
        <TableContainer component={Paper} elevation={4}>
          <Table aria-label="simple table">
            <TableBody>
              {store.categories &&
                store.categories.map((row) => (
                  <TableRow
                    key={row.categoryId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.category}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="edit"
                        onClick={() =>
                          handleOpenModal(row.category, row.categoryId)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteCategory(row.categoryId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              autoFocus
              value={catUpdate}
              onChange={(e) => setCatUpdate(e.target.value)}
              id="category"
              label="Category"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdateCategory}>Update</Button>
          </DialogActions>
        </Dialog>

        <TextField
          value={category}
          // eslint-disable-next-line
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        />
        <LoadingButton
          type="submit"
          loading={false}
          loadingPosition="end"
          variant="contained"
        >
          Create new category
        </LoadingButton>
      </Container>
    </Slide>
  );
}
