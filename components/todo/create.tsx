"use client";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { TodoItem } from "../utils/interface/ToDoItem";
import axios from "axios";
import { TodoType } from "@/app/page";
import { renderPriorityElement, renderTagsElement } from "../utils/constant";

const initialTodo: TodoItem = {
  name: "",
  description: "",
  tags: [],
  completed: false,
  priority: "",
};

type CreateToDoProps = {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  setUpdateTodos: Dispatch<SetStateAction<boolean>>;
};

const CreateToDo = ({ setTodos, setUpdateTodos }: CreateToDoProps) => {
  const [inputValue, setInputValue] = useState(initialTodo);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      setInputValue(initialTodo);
      setSelectedValue([]);
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setInputValue((prev) => ({
      ...prev,
      priority: value,
    }));
  };
  const handleSave = () => {
    const dataFromDialog = {
      ...initialTodo,
      name: inputValue?.name,
      description: inputValue?.description,
      tags: selectedValue,
      priority: inputValue?.priority,
    };
    axios
      .post("/api/todos", dataFromDialog)
      .then((response) => {
        setTodos((prev) => [...prev, response?.data?.todo]);
        setUpdateTodos((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="outline" style={{ float: "right" }}>
          <PlusCircledIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Todo</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Create a new todo!
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              placeholder="Enter title"
              name="name"
              onChange={handleChange}
              value={inputValue?.name}
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
              value={inputValue?.description}
            />
          </label>
          {renderTagsElement(selectedValue, setSelectedValue)}
          {renderPriorityElement(inputValue, handleRadioChange)}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSave}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateToDo;
