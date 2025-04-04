export default function Spinner() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }