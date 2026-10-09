import { useState } from 'react';

interface AiSummaryProps {
  gameId?: number;
}

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function AiSummary({ gameId }: AiSummaryProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [summary, setSummary] = useState<string | null>(null);

  if (!gameId) return null;

  const handleClick = async () => {
    if (status === 'loading' || status === 'done') return;
    setStatus('loading');
    try {
      const res = await fetch(`/api/summary?id=${gameId}`);
      if (!res.ok) throw new Error('request failed');
      const data = await res.json();
      setSummary(data.summary);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="AiSummary">
      {status !== 'done' && (
        <button
          className="AiSummary-btn"
          onClick={handleClick}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '考え中…' : status === 'error' ? 'もう一度試す' : '🤖 AIに聞く'}
        </button>
      )}

      {status === 'error' && (
        <p className="AiSummary-text">今は要約を取得できません。</p>
      )}

      {status === 'done' && (
        <>
          <p className="AiSummary-text">
            {summary ?? 'このゲームは説明文がないため、要約できませんでした。'}
          </p>
          {summary && <p className="AiSummary-note">AIがRAWGの説明文をもとに要約しました</p>}
        </>
      )}
    </div>
  );
}