export default function MessageBubble({ msg }) {
  const isUser = msg.type === "user";
  const isError = msg.error;
  const isLoading = msg.loading;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-2xl">
        <div
          className={`px-4 py-3 rounded-2xl whitespace-pre-wrap ${
            isUser
              ? "bg-blue-600 text-white"
              : isError
              ? "bg-red-900/50 text-red-200"
              : "bg-gray-800 text-white"
          } ${isLoading ? "animate-pulse" : ""}`}
        >
          {msg.text}
        </div>

        {msg.type === "bot" && msg.sources && msg.sources.length > 0 && (
          <details className="mt-2">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
              View sources ({msg.sources.length})
            </summary>
            <div className="text-xs text-gray-400 mt-2 bg-gray-900/50 p-2 rounded max-h-40 overflow-y-auto">
              {msg.sources.map((source, index) => (
                <div key={index} className="mb-2 pb-2 border-b border-gray-700 last:border-0">
                  {source.length > 200 ? `${source.slice(0, 200)}...` : source}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}