import {Box, Divider, ListItem, ListItemText, Paper} from "@/node_modules/@mui/material/index";
import {List} from "@mui/material/index";
import type { ReactElement } from "react"
import React from "react";

interface ChatMessageListProps {
  messages: string[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps): ReactElement {
  return (
    <div>
      <h1>simplechat</h1>

      <hr />

      <Box style={{ height: '50vh', overflow: 'auto' }}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </List>
      </Box>

      <hr />
    </div>
  )
}
