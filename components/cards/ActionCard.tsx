'use client';

interface ResumeData {
  filename: string;
  url: string;
}

interface ContactData {
  email: string;
  linkedin: string;
}

type ActionCardProps =
  | { type: 'resume'; data: ResumeData }
  | { type: 'contact'; data: ContactData };

async function downloadBlob(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(blobUrl);
}

export function ActionCard(props: ActionCardProps) {
  if (props.type === 'resume') {
    return (
      <div className="mt-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Resume
          </p>
          <p className="text-xs text-slate-400">{props.data.filename}</p>
        </div>
        <button
          onClick={() => downloadBlob(props.data.url, props.data.filename)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shrink-0"
        >
          Download
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">
        Get in touch
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={`mailto:${props.data.email}`}
          className="inline-flex items-center px-4 py-2 bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-900 text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          {props.data.email}
        </a>
        <a
          href={props.data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg hover:border-slate-400 transition-colors"
        >
          LinkedIn →
        </a>
      </div>
    </div>
  );
}
