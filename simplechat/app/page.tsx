import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>Hello</div>
      <h1>
        Read <Link href="/posts">this page</Link>
      </h1>
    </main>
  )
}
