import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import React from "react";

type Props = Record<string, never>;

async function createTask(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.todo.create({
    data: {
      title,
      desc: description ?? "",
      updatedAt: new Date(),
    },
  });

  revalidatePath("/");
}

export default function NewListButton(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new</Button>
      </DialogTrigger>

      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>Add new task</DialogTitle>
        </AlertDialogHeader>

        <form action={createTask}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="'title">Title</label>
              <Input name="title" id="title" placeholder="Title" />
            </div>

            <div className="grid gap-3">
              <label htmlFor="'description">Description</label>
              <Input
                name="description"
                id="description"
                placeholder="Task description"
              />
            </div>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
