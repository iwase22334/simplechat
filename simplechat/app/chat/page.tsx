'use client';
import React from "react";
import {Chat, Send} from '@mui/icons-material/index';
import {Box, IconButton, TextField} from '@mui/material/index';
import ChatTextField from './ChatTextField'
import ChatMessageList from './ChatMessageList'
import {useEffect, useRef, useState} from 'react';

export default function Home() {
  const host = process.env.WEBSOCKET_HOST || 'localhost';
  const port = process.env.WEBSOCKET_PORT || 51180;

  const [messages, setMessages] = useState<string[]>([])
  const socketRef = useRef<WebSocket>()

  useEffect(() => {
    const websocket = new WebSocket(`ws://${host}:${port}/api/v1/1/websocket`)
    socketRef.current = websocket

    const onMessage = (event: MessageEvent<string>) => {
      console.log("message arrive", event.data)
      setMessages(prevMessages => [...prevMessages, event.data])
    }

    websocket.addEventListener('message', onMessage)
    websocket.addEventListener('open', () => {console.log("connected")})

    return () => {
      websocket.close()
      websocket.removeEventListener('message', onMessage)
    }
  }, [])

  return (
    <main>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ChatMessageList messages={messages} />
        <ChatTextField createSocketRef={socketRef}/>
      </Box>
    </main>
  )
}
