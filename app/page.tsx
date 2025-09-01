"use client";
import CreateToDo from "@/components/todo/create";
import ListOfTodo from "@/components/todo/list";
import { mockTodos } from "@/components/utils/constant";
import { Flex, Text, Container, Heading, Badge } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyApp() {
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const count = mockTodos.filter((todo) => todo.completed).length;
    setCompletedCount(count);
  }, []);

  useEffect(() => {
    axios.get("/api/todos").then((response: any) => {
      setTodos(response?.data?.todos);
    });
  }, []);
  return (
    <Container size={"1"}>
      <Flex direction="column" pb="2" mt="6">
        <Heading>
          To-Do List Application
          <CreateToDo setTodos={setTodos} />
        </Heading>
        <Text color="gray">Here are your To do this day! </Text>
        <Text color="gray" style={{ float: "right" }}>
          Completed Tasks : <Badge color="iris"> {completedCount}</Badge>
        </Text>
      </Flex>
      <ListOfTodo items={todos} setTodos={setTodos} />
    </Container>
  );
}
