"use client";

import { Box, Button, Stack, TextField, Switch, FormControlLabel } from "@mui/material";
import { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: `Hi, I'm sustAInable. How can I help you today?`
  }]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#d32f2f',
      },
      background: {
        default: darkMode ? '#1c1c1c' : '#f0f0f0',
        paper: darkMode ? '#262626' : '#ffffff',
      },
    },
  }), [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const sendMessage = async () => {
    setLoading(true);
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    // Simulate a response here for simplicity
    setTimeout(() => {
      setMessages((messages) => [
        ...messages.slice(0, messages.length - 1),
        { role: "assistant", content: "Here's my response!" },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="background.default"
        sx={{
          backgroundImage: darkMode
            ? 'linear-gradient(to bottom, #2c3e50, #4ca1af)'
            : 'linear-gradient(to bottom, #ffffff, #e0eafc)',
          transition: 'background 0.5s ease-in-out',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <Stack
          direction={"column"}
          width="400px"
          minHeight="600px"
          borderRadius={8}
          boxShadow={6}
          p={3}
          spacing={3}
          bgcolor="background.paper"
          sx={{
            borderRadius: "20px",
            position: "relative",
            resize: "both", // Allows resizing of the box
            overflow: "auto", // Maintains scrollbars for the chat content
            maxWidth: "100%", // Ensures the box doesn't exceed the viewport
            maxHeight: "100%", // Ensures the box doesn't exceed the viewport
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
              label={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            />
          </Stack>

          <Stack
            direction={"column"}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
              >
                <Box
                  bgcolor={message.role === "assistant" ? "#e0e0e0" : "#1976d2"}
                  color={message.role === "assistant" ? "black" : "white"}
                  borderRadius="20px"
                  p={2}
                  boxShadow={2}
                  maxWidth="70%"
                  sx={{
                    padding: "10px 15px",
                    fontSize: "0.9rem",
                    borderRadius: message.role === "assistant" ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                  }}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
            {loading && (
              <Box display="flex" justifyContent="flex-start" p={2}>
                {/* Loading Indicator */}
              </Box>
            )}
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems="center">
            <TextField
              label="Type a message..."
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              size="small"
              InputProps={{
                sx: {
                  borderRadius: "20px", // Fully round the input field
                  backgroundColor: theme.palette.background.default,
                },
              }}
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: "20px",
                paddingLeft: "10px",
                border: "none",
              }}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={loading}
              sx={{
                paddingX: 3,
                paddingY: 1,
                borderRadius: "20px",
                fontSize: "0.9rem",
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                '&:hover': {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
