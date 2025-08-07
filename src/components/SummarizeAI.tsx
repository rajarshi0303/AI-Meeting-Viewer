import { useState } from "react";
import axios from "axios";

interface Props {
  description?: string;
}

export default function SummarizeAI({ description }: Props) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    setSummary(null);

    if (!description) {
      setError("No description provided.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        { inputs: description.slice(0, 1024) }, // truncate long content
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`, // 👈 ensure this is defined in your .env
          },
        }
      );

      const summaryText =
        response.data?.[0]?.summary_text || "No summary returned.";
      setSummary(summaryText);
    } catch (err) {
      console.error("Summarization failed:", err);
      setError("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleSummarize}
        disabled={loading}
        className="px-4 py-2 rounded-md font-semibold transition-colors duration-200
                   bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-60
                   dark:bg-red-500 dark:hover:bg-red-600"
      >
        {loading ? "Summarizing..." : "Generate AI Summary"}
      </button>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm font-medium">
          {error}
        </p>
      )}

      {summary && (
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-md border border-gray-300 dark:border-gray-700">
          <h3 className="font-bold mb-2">AI Summary:</h3>
          <p className="whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}
