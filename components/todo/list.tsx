"use client";
import { Badge, Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { TodoItem } from "../utils/interface/ToDoItem";

export const renderTags = (tags: string[]) => {
  return tags.map((tag) => {
    let color = "gray";
    let tagValue = "";
    switch (tag.toLowerCase()) {
      case "frontend":
        color = "cyan";
        tagValue = "Frontend";
        break;
      case "dev-ops":
        color = "orange";
        tagValue = "DevOps";
        break;
      case "ui":
        color = "blue";
        tagValue = "UI";
        break;
      case "qa":
        color = "green";
        tagValue = "QA";
        break;
      default:
        color = "gray";
    }
    return (
      <Badge key={tag} color={color}>
        {tag}
      </Badge>
    );
  });
};

export const renderPriority = (priority: string) => {
  let color = "gray";
  let title = "";
  switch (priority.toLowerCase()) {
    case "1":
      color = "red";
      title = "High";
      break;
    case "2":
      color = "yellow";
      title = "Medium";
      break;
    case "3":
      color = "green";
      title = "Low";
      break;
    default:
      color = "gray";
  }
  return (
    <Badge color={color}>
      {title.charAt(0).toUpperCase() + title.slice(1)}
    </Badge>
  );
};
const ListOfTodo = ({
  items,
  setTodos,
}: {
  items: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}) => {
  const handleCompleted = (id: string | number) => {
    setTodos((prevTasks) =>
      prevTasks.map((todos) =>
        todos._id === id ? { ...todos, completed: !todos.completed } : todos
      )
    );
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
            <Flex gap="2">Tags: {renderTags(todo?.tags || [])}</Flex>
            <Text gap="2">
              Priority: {renderPriority(todo?.priority || "")}
            </Text>
          </Flex>
          <Button
            mt="2"
            variant={todo?.completed ? "solid" : "outline"}
            size="2"
            onClick={() => handleCompleted(todo?._id)}
          >
            {todo?.completed ? "Mark as Inprogress" : "Mark as Done"}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default ListOfTodo;
