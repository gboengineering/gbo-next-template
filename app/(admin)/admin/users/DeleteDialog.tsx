"use client";

import { useToast } from "@/components/ui/use-toast";

import deleteUser from "./actions/delete-user";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteDialog({
  children,
  id,
}: Readonly<{
  children: React.ReactNode;
  id: string;
}>) {
  const { toast } = useToast();

  async function handleDelete() {
    const res = await deleteUser(id);
    if (res.error) {
      toast({
        title: "Something is wrong",
        description: res.error,
      });
      return;
    }

    toast({
      title: "User delete success",
      description: res.success,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove the user from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleDelete}>Yes, delete it</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
