import { CategoryInterface } from "../components/store";
import config from "../config";

interface CategoryModel {
  categoryId: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export async function createCategory(category: string): Promise<CategoryModel> {
  const categoryCreated = await fetch(`${config.api.baseurl}/category`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category,
    }),
  }).then((response) => response.json());
  return categoryCreated;
}

export async function getCategories() {
  const allCategories = await fetch(`${config.api.baseurl}/category`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).then((response) => response.json());
  return allCategories;
}

export async function deleteCategory(
  categoryId: string
): Promise<CategoryModel> {
  const categoryDeleted = await fetch(
    `${config.api.baseurl}/category/delete/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
    }
  ).then((response) => response.json());
  return categoryDeleted;
}

export async function updateCategory(
  category: CategoryInterface
): Promise<CategoryModel> {
  const updatedCategory = await fetch(
    `${config.api.baseurl}/category/update/${category.categoryId}`,
    {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: category.category,
      }),
    }
  ).then((response) => response.json());
  return updatedCategory;
}
