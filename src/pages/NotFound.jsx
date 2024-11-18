export default function () {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-6 rounded shadow-lg bg-white max-w-md">
                <h1 className="text-4xl font-bold text-red-500 mb-4">
                    404 Error
                </h1>
                <p className="text-lg text-gray-700">
                    The page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="mt-6 inline-block text-blue-500 hover:underline hover:text-blue-700"
                >
                    Go back to the homepage
                </a>
            </div>
        </div>
    );
}
