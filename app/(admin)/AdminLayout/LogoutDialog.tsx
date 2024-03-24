import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import logout from "./actions/logout";

export default function LogoutDialog({
  setDialogOpen,
}: {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  async function handleLogout() {
    await logout();
    window.location.reload();
  }

  return (
    <Dialog open={true} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will force you to login again
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogClose>
          <form action={handleLogout}>
            <Button>Yes, Logout</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
