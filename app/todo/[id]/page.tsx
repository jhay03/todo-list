"use client";

import { useRouter } from "next/navigation";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { renderPriority, renderTags } from "@/components/utils/constant";
import UpdateDialog from "./update-dialog";
import DeleteDialog from "./delete-dialog";

interface TodoItem {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  completed: boolean;
  priority: string;
}

const ViewAndUpdateTodo = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);

  const router = useRouter();

  const [inputValue, setInputValue] = useState<TodoItem | null>(null);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<TodoItem | null>(null);

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
      setInitialValue({ ...foundTodo });
      setSelectedValue([...foundTodo.tags]);
    }
  }, [id, todos]);

  const handleRadioChange = (val: string) => {
    setInputValue((prev: any) => ({
      ...prev,
      priority: val,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleCancelButton = () => {
    if (initialValue) {
      setInputValue({ ...initialValue });
      setSelectedValue([...initialValue.tags]);
    }
    setOpen(false);
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
          <Flex gap="1" direction="column">
            <Text size={"1"} color="blue">
              TDL#{inputValue?._id}
            </Text>
            <Text>Name: {inputValue?.name}</Text>
            <Text>Description: {inputValue?.description}</Text>
            <Flex gap="2">Tags: {renderTags(selectedValue)}</Flex>
            <Text>Priority: {renderPriority(inputValue?.priority)}</Text>
          </Flex>
          <Link href={"/"}>
            <Button variant="outline" mt="3">
              Back
            </Button>
          </Link>
          <div style={{ float: "right", marginTop: "10px" }}>
            <Button
              color="green"
              variant="outline"
              onClick={() => setOpen(true)}
              mr="2"
            >
              <Pencil1Icon />
            </Button>
            <Button
              color="red"
              style={{ float: "right" }}
              variant="outline"
              onClick={() => setOpenAlert(true)}
            >
              <TrashIcon />
            </Button>

            <DeleteDialog
              openAlert={openAlert}
              setOpenAlert={setOpenAlert}
              inputValue={inputValue}
              handleDelete={handleDelete}
            />
          </div>
        </Card>
      </Container>
      <UpdateDialog
        open={open}
        setOpen={setOpen}
        inputValue={inputValue}
        handleChange={handleChange}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        handleRadioChange={handleRadioChange}
        handleCancelButton={handleCancelButton}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

export default ViewAndUpdateTodo;
