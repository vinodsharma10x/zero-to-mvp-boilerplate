import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Welcome to Zero to MVP Boilerplate</h1>
      <p className="text-lg">This is a starting point for your Next.js project, now with Tailwind CSS!</p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Features:</h2>
        <ul className="list-disc list-inside">
          <li>Next.js 14 with App Router</li>
          <li>TypeScript support</li>
          <li>Tailwind CSS for styling</li>
          <li>Dark/Light theme toggle</li>
          <li>Basic layout structure</li>
          <li>API route example</li>
        </ul>
      </div>
    </Layout>
  )
}
