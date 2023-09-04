import React from 'react'
import Link from 'next/link';

export default function FirstPost() {
    return (
      <>
        <h1>Hello First Post</h1>
        <h2>
          <Link href="/">Back to home</Link>
        </h2>
      </>
    );
}
