import {Send} from "@/node_modules/@mui/icons-material/index"
import {Box, IconButton, TextField} from "@/node_modules/@mui/material/index"
import { MutableRefObject, ReactElement, useState } from "react"

interface ChatTextFieldProps {
  createSocketRef: MutableRefObject<WebSocket | undefined>;
}

export default function ChatTextField({createSocketRef} :ChatTextFieldProps) {
  const [line, setLine] = useState("")
  return <Box>
    <TextField
      id="text-field"
      value={line}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setLine(e.target.value)}}
    />
    <IconButton color="primary" aria-label="send"
      onClick={() => {
        createSocketRef.current?.send(line)
        setLine("")
      }}
    >
      <Send />
    </IconButton>
  </Box>
}
