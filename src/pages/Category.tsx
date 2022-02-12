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
import { useAppStore, CategoryInterface } from "../components/store";
import Container from "../components/Container";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../api/categories";
import { useCategories } from "../api/queries";

export default function Category() {
  const { store } = useAppStore();
  const [newCategory, setNewCategory] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<CategoryInterface>(
    {} as CategoryInterface
  );
  const [open, setOpen] = useState<boolean>(false);
  const { data: categories, refetch: refreshCategories } = useCategories();

  const handleOpenModal = (category: CategoryInterface) => {
    setActiveCategory(category);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateCategory = async () => {
    const updatedCategory = await updateCategory(activeCategory);
    if (updatedCategory) {
      refreshCategories();
    }
    setOpen(false);
  };

  const handleCreateCategory = async () => {
    if (newCategory !== "") {
      await createCategory(newCategory);
      refreshCategories();
      setNewCategory("");
    }
  };
  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategory(categoryId);
    refreshCategories();
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
              {categories &&
                categories.map((c) => (
                  <TableRow
                    key={c.categoryId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {c.category}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleOpenModal(c)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteCategory(c.categoryId)}
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
              value={activeCategory.category}
              onChange={(e) =>
                setActiveCategory((prev) => {
                  return {
                    categoryId: prev.categoryId,
                    category: e.target.value,
                  };
                })
              }
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
          value={newCategory}
          // eslint-disable-next-line
          onChange={(e) => setNewCategory(e.target.value)}
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
