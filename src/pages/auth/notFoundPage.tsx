export default function NotFoundPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Page Not Found</p>
        <a href="/" className="mt-6 text-blue-500 underline">Go Back Home</a>
      </div>
    );
  }