'use client';
import React from "react";
import {Chat, Send} from '@mui/icons-material/index';
import {Box, IconButton, TextField} from '@mui/material/index';
import ChatTextField from '../../components/ChatTextField'
import ChatMessageList from '../../components/ChatMessageList'
import {useEffect, useRef, useState} from 'react';

export default function Home() {
  const [messages, setMessages] = useState<string[]>(['hello', 'world'])
  const socketRef = useRef<WebSocket>()

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8080/1/websocket")
    socketRef.current = websocket

    const onMessage = (event: MessageEvent<string>) => {
      console.log("message arrive", messages)
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
      <div>Hello</div>
      <ChatMessageList messages={messages} />
      <ChatTextField createSocketRef={socketRef}/>
    </main>
  )
}
