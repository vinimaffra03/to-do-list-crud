import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ListViewType } from "@/lib/_type";
import { prisma } from "@/prisma";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Edit, PenLine, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import React from "react";

type Props = {
  params: ListViewType;
};

async function EditTodo(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const id = Number(formData.get("id"));

  if (!id) return;

  await prisma.todo.update({
    where: { id },
    data: {
      title,
      desc,
    },
  });

  revalidatePath("/");
}

async function deleteTodo(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  if (!id) return;

  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/");
}

const ListView = ({ params }: Props) => {
  return (
    <Card className="w-1/3">
      <CardContent className="w-full flex justify-between items-center">
        <h1>{params.title}</h1>

        <div className="flex gap-5 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <PenLine className="cursor-pointer" />
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit task</DialogTitle>
              </DialogHeader>

              <form action={EditTodo}>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    id="id"
                    name="id"
                    value={params.id}
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      name="title"
                      id="title"
                      defaultValue={params.title}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Label htmlFor="desc">Description</Label>
                    <Input name="desc" id="desc" defaultValue={params.desc} />
                  </div>

                  <Button type="submit"></Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <form action={deleteTodo}>
            <input type="hidden" name="id" id="id" defaultValue={params.id} />
            <button type="submit">
              <Trash2 className="text-red-500 hover:text-red-700 transition" />
            </button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListView;
