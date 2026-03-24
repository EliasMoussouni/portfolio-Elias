import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateAssistantAnswer } from './answerEngine';
import { ChatMessage } from './types';
import './eliasGpt.css';

const EliasGptPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Je suis EliasGPT. Je reponds de facon fiable sur mon experience, mes projets, mes competences, ma formation, mes activites et mon contact.',
      timestamp: Date.now(),
      meta: {
        sections: ['Experience', 'Projects', 'Skills'],
        confidence: 'high',
        intent: 'greeting'
      }
    }
  ]);

  const canSend = input.trim().length > 1 && !isLoading;

  const suggestions = useMemo(
    () => [
      'Parle-moi de toi en 30 secondes',
      'Quel est ton projet dont tu es le plus fier ?',
      'Que fais-tu actuellement ?',
      'Comment te contacter ?'
    ],
    []
  );

  const sendMessage = async (content: string) => {
    const value = content.trim();
    if (value.length < 2 || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: value,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const historyForAnswer = [...messages, userMessage];
    const assistantPayload = generateAssistantAnswer(value, { history: historyForAnswer });

    const assistantMessage: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      role: 'assistant',
      content: assistantPayload.answer,
      timestamp: Date.now() + 1,
      meta: assistantPayload.meta
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setFollowUps(assistantPayload.suggestions);
    setIsLoading(false);
  };

  return (
    <div className="elias-gpt-page">
      <header className="elias-gpt-header">
        <h1>EliasGPT</h1>
        <p>Assistant portfolio guide, alimente par les donnees structurees du site.</p>
      </header>

      <div className="elias-gpt-suggestions" role="list" aria-label="Questions suggerees">
        {suggestions.map((suggestion) => (
          <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} disabled={isLoading}>
            {suggestion}
          </button>
        ))}
      </div>

      <main className="elias-gpt-thread" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`elias-gpt-message ${message.role}`}>
            <span className="elias-gpt-role">{message.role === 'assistant' ? 'EliasGPT' : 'Toi'}</span>
            <p>{message.content}</p>
            {message.role === 'assistant' && message.meta?.sections?.length ? (
              <div className="elias-gpt-meta">
                <span className={`elias-gpt-confidence ${message.meta.confidence || 'medium'}`}>
                  {message.meta.confidence || 'medium'}
                </span>
                <span>{message.meta.sections.join(' • ')}</span>
              </div>
            ) : null}
            {message.role === 'assistant' && message.meta?.sources?.length ? (
              <div className="elias-gpt-sources">
                {message.meta.sources.slice(0, 3).map((source) => (
                  <Link key={`${message.id}-${source.label}`} to={source.route} className="elias-gpt-source-link">
                    {source.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        ))}
        {isLoading ? (
          <article className="elias-gpt-message assistant">
            <span className="elias-gpt-role">EliasGPT</span>
            <p>Je reflechis...</p>
          </article>
        ) : null}
      </main>

      {followUps.length ? (
        <div className="elias-gpt-followups" role="list" aria-label="Relances suggerees">
          {followUps.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} disabled={isLoading}>
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      <footer className="elias-gpt-composer">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Pose une question sur le portfolio..."
          rows={2}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              void sendMessage(input);
            }
          }}
        />
        <button type="button" onClick={() => sendMessage(input)} disabled={!canSend}>
          Envoyer
        </button>
      </footer>
    </div>
  );
};

export default EliasGptPage;
