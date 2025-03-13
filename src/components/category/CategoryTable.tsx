import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Category } from "@/types";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            {/* <th className="p-3 text-left">Image</th> */}
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b">
              {/* <td className="p-3">
                <Image
                  width={80}
                  height={50}
                  src={category.imageUrl || "/default-sport-image.webp"}
                  alt={category.name}
                  className="h-14 w-24 object-cover rounded-md"
                />
              </td> */}
              <td className="p-3">
                <Link
                  className="text-blue-600 hover:underline"
                  href={`/category/${category._id}`}
                >
                  {category.name}
                </Link>
              </td>
              <td className="p-3 text-center flex gap-2 justify-center">
                <Button size="sm" onClick={() => onEdit(category)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(category._id)}
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
