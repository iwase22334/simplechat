import {Send} from "@/node_modules/@mui/icons-material/index"
import {Box, IconButton, TextField} from "@/node_modules/@mui/material/index"
import type { ReactElement } from "react"

export default function ChatTextField() {
  return <Box>
    <TextField
      id="outlined-multiline-flexible"
      multiline
    />
    <IconButton color="primary" aria-label="send">
      <Send />
    </IconButton>
  </Box>
}
