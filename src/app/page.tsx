import React from "react";
import NewListButton from "./components/NewListButton";
import { prisma } from "@/prisma";
import { title } from "process";
import { ListViewType } from "@/lib/_type";
import ListView from "./components/ListView";

type Props = Record<string, never>;

const page = async (props: Props) => {
  const myList: ListViewType[] = await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      desc: true,
    },
  });

  return (
    <div className="flex-col w-full justify-center items-center p-4 gap-4 space-y-2">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold">My list</h1>
        <NewListButton />
      </div>

      <div className="flex-col w-full space-y-11 justify-center items-center">
        {/* Todo List */}
        {myList.length > 0 ? (
          <div className="flex flex-col w-full justify-center items-center p-4 gap-4">
            {myList.map((task) => (
              <ListView key={task.id} params={task} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nothing added to the list</p>
        )}
      </div>
    </div>
  );
};

export default page;
