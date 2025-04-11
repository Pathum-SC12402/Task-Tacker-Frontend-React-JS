import httpRequest from "@/api/request";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteConfirmation from "../shared/deleteConf";

export function UserListTable() {
  interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }

  const [userData, setUserData] = useState<User[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpRequest.get("/data/getAllUsers");
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = response.data;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (selectedUserId) {
      try {
        const response = await httpRequest.delete(`/data/delete-user/${selectedUserId}`);
        if (response.status !== 200) {
          throw new Error("Failed to delete user");
        }
        setUserData((prevUsers) => prevUsers.filter((user) => user._id !== selectedUserId));
        setIsDeleteOpen(false);
        setSelectedUserId(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const openDeleteConfirmation = (userId: string) => {
    setSelectedUserId(userId);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <Table>
        <TableCaption>A list of users details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{user.name || "N/A"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{format(new Date(user.createdAt), 'yyyy-MM-dd')}</TableCell>
              <TableCell>{format(new Date(user.updatedAt), 'yyyy-MM-dd')}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => openDeleteConfirmation(user._id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Users</TableCell>
            <TableCell className="text-right">{userData.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Delete confirmation modal */}
      {isDeleteOpen && (
        <DeleteConfirmation
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteOpen(false)}
        />
      )}
    </>
  );
}
