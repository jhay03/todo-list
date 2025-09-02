import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

const NoTodo = () => {
  return (
    <Card mt="2">
      <Flex gap="1" direction="column">
        <Text>You don't have any Todo today! </Text>
        <Flex gap="2">you can create one by clicking the + button </Flex>
      </Flex>
    </Card>
  );
};

export default NoTodo;
