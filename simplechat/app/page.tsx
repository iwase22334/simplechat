'use client';

import {Chat, Send} from '@/node_modules/@mui/icons-material/index';
import {Box, IconButton, TextField} from '@/node_modules/@mui/material/index';
import ChatTextField from '../components/ChatTextField'
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>Hello</div>
      <ChatTextField />
    </main>
  )
}
