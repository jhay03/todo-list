"use client";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { TodoItem } from "../utils/interface/ToDoItem";
import { renderPriority, renderTags } from "../utils/constant";
import axios from "axios";
import { TodoType } from "@/app/page";
type ListOfTodoProps = {
  items: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};
const ListOfTodo = ({ items, setTodos }: ListOfTodoProps) => {
  const handleCompleted = async (id: string) => {
    const currentTodo = items.find((todo) => todo._id === id);
    if (!currentTodo) return;

    const newCompletedStatus = !currentTodo.completed;

    try {
      const response = await axios.put(`/api/todos/${id}`, {
        completed: newCompletedStatus,
      });

      const updatedTodo = response.data.todo;

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Error updating completed status:", error);
    }
  };

  return (
    <div>
      {items?.map((todo: TodoItem) => (
        <Card
          key={todo?._id}
          mt="2"
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          <Flex gap="1" direction="column">
            <Text size={"1"} color="blue">
              <Link href={`/todo/${todo?._id}`}>TDL#{todo?._id}</Link>
            </Text>
            <Text>Name: {todo?.name}</Text>
            <Text>Description: {todo?.description}</Text>
            <Flex gap="2">Tags: {renderTags(todo?.tags)}</Flex>
            <Text>Priority: {renderPriority(todo?.priority)}</Text>
          </Flex>
          <Button
            mt="2"
            variant={todo?.completed ? "solid" : "outline"}
            size="2"
            onClick={() => handleCompleted(todo?._id || "")}
          >
            {todo?.completed ? "Mark as Inprogress" : "Mark as Done"}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default ListOfTodo;
