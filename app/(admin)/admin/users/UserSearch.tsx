import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserSearch() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const username = formData.get("username");

    redirect(`?q=${username}`);
  }

  return (
    <form
      action={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input name="username" placeholder="Type username" required />
      <Button type="submit">Search</Button>
    </form>
  );
}
