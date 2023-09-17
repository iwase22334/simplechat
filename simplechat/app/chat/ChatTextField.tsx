import {Send} from "@/node_modules/@mui/icons-material/index"
import {Box, IconButton, TextField} from "@/node_modules/@mui/material/index"
import { MutableRefObject, ReactElement, useState } from "react"

interface ChatTextFieldProps {
  createSocketRef: MutableRefObject<WebSocket | undefined>;
}

export default function ChatTextField({createSocketRef} :ChatTextFieldProps) {
  const [line, setLine] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("text-field"))

    createSocketRef.current?.send(line)
    setLine("")
  }

  return <Box component="form" onSubmit={handleSubmit} display="flex" sx={{ alignItems: 'center' }}>
    <TextField
      id="text-field"
      value={line}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setLine(e.target.value)
      }}
    />

    <IconButton type="submit" color="primary" aria-label="send" >
      <Send />
    </IconButton>
  </Box>
}
