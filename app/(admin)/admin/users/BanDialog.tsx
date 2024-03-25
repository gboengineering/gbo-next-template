"use client";

import { useToast } from "@/components/ui/use-toast";

import banUser from "./actions/ban-user";

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

export default function BanDialog({
  children,
  id,
}: Readonly<{
  children: React.ReactNode;
  id: string;
}>) {
  const { toast } = useToast();

  async function handleDelete() {
    const res = await banUser(id);
    if (res.error) {
      toast({
        title: "Something is wrong",
        description: res.error,
      });
      return;
    }

    toast({
      title: "User ban success",
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
            This will set the user status to NON-ACTIVE, preventing them to log
            in to the site
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleDelete}>Yes, ban it</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
