import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, Divider, Spinner } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [agentId, setAgentId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!threadId) {
      const threadResponse = await fetch(`https://api.openai.com/v1/assistants/${agentId}/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "OpenAI-Beta": "assistants=v1",
        },
        body: JSON.stringify({
          assistant_id: agentId,
        }),
      });

      const threadData = await threadResponse.json();
      setThreadId(threadData.thread_id);
    }

    await fetch(`https://api.openai.com/v1/assistants/${agentId}/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1",
      },
      body: JSON.stringify({
        input: message,
      }),
    });

    const responseResponse = await fetch(`https://api.openai.com/v1/assistants/${agentId}/threads/${threadId}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Beta": "assistants=v1",
      },
    });

    const responseData = await responseResponse.json();
    setConversation([...conversation, { user: message, agent: responseData.output }]);
    setMessage("");
    setLoading(false);
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={4} bg="gray.900" color="white">
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Personal AI Agent
      </Heading>

      {!agentId && (
        <VStack spacing={4}>
          <Input placeholder="Enter your AI Agent ID" value={agentId} onChange={(e) => setAgentId(e.target.value)} bg="gray.800" />
          <Input type="password" placeholder="Enter your OpenAI API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} bg="gray.800" />
          <Button colorScheme="blue" onClick={() => setAgentId(agentId)}>
            Set Agent ID
          </Button>
        </VStack>
      )}

      {agentId && (
        <>
          <VStack spacing={4} align="stretch">
            {conversation.map((msg, index) => (
              <Box key={index} borderWidth={1} borderRadius="md" padding={4} bg="gray.800">
                <Text fontWeight="bold">User:</Text>
                <Text>{msg.user}</Text>
                <Divider my={2} />
                <Text fontWeight="bold">Agent:</Text>
                <Text>{msg.agent}</Text>
              </Box>
            ))}
          </VStack>

          <form onSubmit={handleSubmit}>
            <HStack marginTop={4}>
              <Input placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} bg="gray.800" />
              <Button colorScheme="blue" type="submit" rightIcon={<FaPaperPlane />} isLoading={loading}>
                Send
              </Button>
            </HStack>
          </form>
        </>
      )}
    </Box>
  );
};

export default Index;
