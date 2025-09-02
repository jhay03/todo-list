import {
  renderPriorityElement,
  renderTagsElement,
} from "@/components/utils/constant";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React from "react";

const UpdateDialog = ({
  open,
  setOpen,
  inputValue,
  handleChange,
  selectedValue,
  setSelectedValue,
  handleRadioChange,
  handleCancelButton,
  handleUpdate,
}) => {
  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Update Todo</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Edit and save the todo!
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                TDL#{inputValue?._id}
              </Text>
              <TextField.Root
                name="id"
                value={inputValue?._id.toString()}
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
                resize={"vertical"}
              />
            </label>
            {renderTagsElement(selectedValue, setSelectedValue)}
            {renderPriorityElement(inputValue, handleRadioChange)}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" onClick={handleCancelButton}>
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleUpdate}>Update</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default UpdateDialog;
