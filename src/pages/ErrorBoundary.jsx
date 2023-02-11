import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
const ErrorBoundary = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#262626",
        color: "#fff",
      }}
      className="w-100 flex flex-column justify-center align-center"
    >
      <Box width="100%" className="w-100 flex flex-column justify-center align-center  gap-3">
        <Spinner size="xl" />
        <Text width="100%" mt={4} fontSize="xl">
          There is an issue in the website , we will fix it soon
        </Text>
      </Box>
    </section>
  );
};

export default ErrorBoundary;
