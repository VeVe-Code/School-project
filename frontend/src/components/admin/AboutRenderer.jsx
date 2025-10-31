import React from 'react';

export default function AboutRenderer({ about }) {
  if (!about) return null;

  const lines = about.split('\n').filter(Boolean);
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Helper to render clickable links
  const renderLineWithLinks = (text) => {
    const parts = text.split(urlRegex);
    return parts.map((part, i) =>
      urlRegex.test(part) ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  if (lines.length > 1) {
    // Render as list
    return (
      <ul className="list-disc list-inside">
        {lines.map((line, idx) => (
          <li key={idx}>{renderLineWithLinks(line)}</li>
        ))}
      </ul>
    );
  } else {
    // Single line → paragraph
    return <p>{renderLineWithLinks(about)}</p>;
  }
}