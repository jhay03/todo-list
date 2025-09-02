"use client";

import { useRouter } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Button,
  Card,
  CheckboxGroup,
  Container,
  Dialog,
  Flex,
  Heading,
  RadioGroup,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import { renderPriority, renderTags } from "@/components/utils/constant";

interface TodoItem {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  completed: boolean;
  priority: string;
}

const ViewAndUpdateTodo = ({ params }: { params: { id: string } }) => {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const router = useRouter();

  const [inputValue, setInputValue] = useState<TodoItem | null>(null);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("/api/todos").then((response: any) => {
      setTodos(response?.data?.todos);
    });
  }, []);

  useEffect(() => {
    const foundTodo = todos.find((todo: TodoItem) => todo._id === id);
    if (foundTodo) {
      setInputValue({
        ...foundTodo,
        tags: [...foundTodo.tags],
        _id: foundTodo._id,
        name: foundTodo.name,
      });
      setSelectedValue([...foundTodo.tags]);
    }
  }, [id, todos]);

  const handleRadioChange = (val: string) => {
    setInputValue((prev: any) => ({
      ...prev,
      priority: val,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleUpdate = async () => {
    if (!inputValue) return;

    const updatedTodo = {
      name: inputValue.name,
      description: inputValue.description,
      tags: selectedValue,
      completed: inputValue.completed,
      priority: inputValue.priority,
    };

    try {
      const response = await axios.patch(
        `/api/todos/${inputValue._id}`,
        updatedTodo
      );
      const updatedFromServer = response.data.todo;

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedFromServer._id ? updatedFromServer : todo
        )
      );
      setInputValue(updatedFromServer);
      setSelectedValue([...updatedFromServer.tags]);
      setOpen(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (!inputValue) return null;

  const handleDelete = async (id: string | number) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        data: { _id: id },
      });
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      console.log("Delete Todo with ID:", id, updatedTodos);
      router.push("/");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <Container size={"1"}>
        <Flex direction="column" pb="2" mt="6">
          <Heading>View your todo details</Heading>
          <Text color="gray">Here are your to do details! </Text>
        </Flex>
        <Card
          key={id}
          mt="2"
          style={{
            textDecoration: inputValue.completed ? "line-through" : "none",
          }}
        >
          <div>
            <Button
              variant="solid"
              style={{ float: "right" }}
              onClick={() => setOpen(true)}
            >
              Update TDL#{id}
            </Button>
          </div>
          <Flex gap="1" direction="column">
            <Text size={"1"} color="blue">
              TDL#{inputValue?._id}
            </Text>

            <Text>Name: {inputValue?.name}</Text>
            <Text>Description: {inputValue?.description}</Text>
            <Flex gap="2">Tags: {renderTags(selectedValue)}</Flex>
            <Text gap="2">
              Priority: {renderPriority(inputValue?.priority)}
            </Text>
          </Flex>
          <Link href={"/"}>
            <Button variant="outline" mt="3">
              Back
            </Button>
          </Link>
          <Button
            color="red"
            style={{ float: "right" }}
            mt="2"
            onClick={() => handleDelete(inputValue._id)}
            variant="primary"
          >
            <TrashIcon />
          </Button>
        </Card>
      </Container>
      {/* For update */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Update Todo</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Edit and save the todo!
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                TDL#{inputValue._id}
              </Text>
              <TextField.Root
                name="id"
                value={inputValue._id.toString()}
                disabled
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                placeholder="Enter name"
                name="name"
                onChange={handleChange}
                value={inputValue.name}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextArea
                placeholder="Enter Description"
                name="description"
                onChange={handleChange}
                value={inputValue.description}
              />
            </label>
            <CheckboxGroup.Root
              name="tags"
              value={selectedValue}
              onValueChange={(newValues) => setSelectedValue(newValues)}
            >
              <Text as="div" size="2" mb="1" weight="bold">
                Tags:
              </Text>
              <CheckboxGroup.Item value="Frontend">Frontend</CheckboxGroup.Item>
              <CheckboxGroup.Item value="QA">QA</CheckboxGroup.Item>
              <CheckboxGroup.Item value="Devops">Devops</CheckboxGroup.Item>
              <CheckboxGroup.Item value="UI">UI</CheckboxGroup.Item>
            </CheckboxGroup.Root>
            <RadioGroup.Root
              name="priority"
              value={inputValue?.priority}
              onValueChange={handleRadioChange}
            >
              <Text as="div" size="2" mb="1" weight="bold">
                Priority:
              </Text>
              <RadioGroup.Item value="1">High</RadioGroup.Item>
              <RadioGroup.Item value="2">Medium</RadioGroup.Item>
              <RadioGroup.Item value="3">Low</RadioGroup.Item>
            </RadioGroup.Root>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleUpdate}>Update</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default ViewAndUpdateTodo;
