import { CategoryInterface } from "../components/store";

export default function mapCategory(
  categoryId: string,
  categories: CategoryInterface[]
): string {
  const categoryObject = categories.find((c) => c.categoryId === categoryId);
  return categoryObject ? categoryObject.category : "";
}
