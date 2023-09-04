import type { ReactElement } from "react"
import React from "react";

interface ChatMessageListProps {
  messages: string[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps): ReactElement {
  return (
    <div>
      <h1>メッセージリスト</h1>
      <hr />
      <ul>
        {messages.map((message, index) => (<li key={index}>{message}</li>))}
      </ul>
      <hr />
    </div>
  )
}
