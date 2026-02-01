import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppData } from '@/app/state/AppData';
import { MessageSquare, Heart, Share2, MoreHorizontal, Send, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';

export function ThreadDetail() {
  const { id } = useParams<{ id: string }>();
  const { threads, users, topics, comments, addComment, toggleThreadLike, isThreadLiked } = useAppData();

  const thread = useMemo(() => threads.find((t) => t.id === id), [threads, id]);
  const author = useMemo(() => users.find((u) => u.id === thread?.authorId), [users, thread?.authorId]);
  const topic = useMemo(() => topics.find((t) => t.id === thread?.topicId), [topics, thread?.topicId]);

  const threadComments = useMemo(() => {
    if (!thread) return [];
    return comments
      .filter((c) => c.threadId === thread.id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [comments, thread]);

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);

  const initials = (name?: string) => {
    const n = (name ?? '').trim();
    if (!n) return 'TT';
    const parts = n.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const second = parts.length > 1 ? (parts[1]?.[0] ?? '') : (parts[0]?.[1] ?? '');
    return (first + second).toUpperCase();
  };

  if (!thread) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Thread not found</h1>
            <p className="text-neutral-600 mb-6">This thread may have been removed, or the link is incorrect.</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const liked = isThreadLiked(thread.id);

  function onSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    setCommentError(null);

    const text = commentText.trim();
    if (!text) {
      setCommentError('Please write a comment before posting.');
      return;
    }

    try {
      addComment({ threadId: thread.id, content: text });
      setCommentText('');
    } catch (err: any) {
      setCommentError(err?.message ?? 'Could not post comment.');
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link to="/" className="text-sm font-medium text-neutral-600 hover:text-teal-600">
            ← Back
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium">
                  {topic?.name ?? 'Category'}
                </span>
                <span className="text-xs text-neutral-500">{format(new Date(thread.createdAt), 'PP p')}</span>
              </div>

              <h1 className="text-2xl font-bold text-neutral-900">{thread.title}</h1>

              {thread.content && (
                <p className="mt-3 text-neutral-800 leading-relaxed whitespace-pre-wrap">{thread.content}</p>
              )}

              <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-neutral-200 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-neutral-700">{initials(author?.name)}</span>
                  </div>
                  <span className="font-medium text-neutral-700">{author?.name ?? 'Anonymous'}</span>
                </div>
                <span className="text-neutral-400">•</span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-teal-600" />
                  Trinidad &amp; Tobago
                </span>
              </div>
            </div>

            <button
              type="button"
              className="p-2 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-200"
              aria-label="More"
            >
              <MoreHorizontal className="h-5 w-5 text-neutral-500" />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => toggleThreadLike(thread.id)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                liked
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{thread.likes}</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 text-neutral-700">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">{threadComments.length}</span>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-neutral-900 mb-4">Comments</h2>

          <form onSubmit={onSubmitComment} className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-neutral-200 flex-shrink-0 flex items-center justify-center">
              <span className="text-xs font-bold text-neutral-700">{initials(users[0]?.name)}</span>
            </div>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full min-h-[90px] rounded-lg border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-teal-200"
              />

              {commentError && <p className="mt-2 text-sm text-rose-600">{commentError}</p>}

              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700"
                >
                  <Send className="h-4 w-4" />
                  Post Comment
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 grid gap-4">
            {threadComments.length === 0 ? (
              <p className="text-neutral-600">No comments yet. Be the first.</p>
            ) : (
              threadComments.map((c) => {
                const commentAuthor = users.find((u) => u.id === c.authorId);
                return (
                  <div key={c.id} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-neutral-200 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-neutral-700">{initials(commentAuthor?.name)}</span>
                        </div>
                        <span className="text-sm font-semibold text-neutral-800">{commentAuthor?.name ?? 'Anonymous'}</span>
                      </div>
                      <span className="text-xs text-neutral-500">{format(new Date(c.createdAt), 'PP')}</span>
                    </div>
                    <p className="mt-2 text-neutral-800 whitespace-pre-wrap">{c.content}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
