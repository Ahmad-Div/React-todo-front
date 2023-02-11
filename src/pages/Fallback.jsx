import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
const Fallback = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#262626",
        color: "#fff",
      }}
      className="w-100 flex flex-column justify-center align-center"
    >
      <Box width="100%" className="w-100 flex flex-column justify-center align-center">
        <Spinner size="xl" />
      </Box>
    </section>
  );
};

export default Fallback;
