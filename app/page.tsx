"use client";
import CreateToDo from "@/components/todo/create";
import ListOfTodo from "@/components/todo/list";
import { Flex, Text, Container, Heading, Badge } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axios from "axios";
import NoTodo from "@/components/todo/no-todo";

export type TodoType = {
  _id: string;
  name: string;
  description: string;
  tags: Array<"Frontend" | "QA" | "UI" | "Devops">;
  completed: boolean;
  priority: "1" | "2" | "3";
  createdAt?: string;
  updatedAt?: string;
};
export default function MyApp() {
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [updateTodos, setUpdateTodos] = useState<boolean>(0);

  useEffect(() => {
    axios.get("/api/todos").then((response: any) => {
      setTodos(response?.data?.todos);
    });
  }, [updateTodos]);

  useEffect(() => {
    const count = todos.filter((todo: any) => todo?.completed).length;
    setCompletedCount(count);
  }, [todos]);

  return (
    <Container size={"1"}>
      <Flex direction="column" pb="2" mt="6">
        <Heading>
          To-Do List Application
          <CreateToDo setTodos={setTodos} setUpdateTodos={setUpdateTodos} />
        </Heading>
        {todos.length > 0 ? (
          <>
            <Text color="gray">Here are your To do this day! </Text>
            <Text color="gray" style={{ float: "right" }}>
              Completed Tasks : <Badge color="iris"> {completedCount}</Badge>
            </Text>
            <Text color="red">This is sorted by title and priority</Text>
          </>
        ) : (
          <NoTodo />
        )}
      </Flex>

      <ListOfTodo items={todos} setTodos={setTodos} />
    </Container>
  );
}
