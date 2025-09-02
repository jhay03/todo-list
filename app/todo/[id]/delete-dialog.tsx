import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

const DeleteDialog = ({
  openAlert,
  setOpenAlert,
  inputValue,
  handleDelete,
}) => {
  return (
    <div>
      <AlertDialog.Root open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>
            Ticket#{inputValue?._id} will be deleted
          </AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This ticket will be deleted.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={() => handleDelete(inputValue._id)}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteDialog;
