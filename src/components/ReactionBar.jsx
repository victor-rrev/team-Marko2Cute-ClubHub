import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FiHeart } from 'react-icons/fi'
import { addPostReaction, listPostReactions, removePostReaction } from '../services/reactions'
import { useAuth } from '../contexts/AuthContext'

const HEART = '❤️'

export default function ReactionBar({ postId }) {
  const { user } = useAuth()
  const [reactions, setReactions] = useState([])
  const [pending, setPending] = useState(false)

  useEffect(() => {
    let cancelled = false
    listPostReactions(postId)
      .then((result) => { if (!cancelled) setReactions(result) })
      .catch((err) => console.error('[reactions] list failed:', err.code || err.name, '—', err.message))
    return () => { cancelled = true }
  }, [postId])

  const heartCount = reactions.filter((r) => r.emoji === HEART).length
  const iLiked = user ? reactions.some((r) => r.userId === user.uid && r.emoji === HEART) : false

  const toggle = async () => {
    if (!user || pending) return
    setPending(true)
    try {
      if (iLiked) {
        await removePostReaction(postId, HEART)
        setReactions((prev) => prev.filter((r) => !(r.userId === user.uid && r.emoji === HEART)))
      } else {
        await addPostReaction(postId, HEART)
        setReactions((prev) => [...prev, { userId: user.uid, emoji: HEART, createdAt: new Date() }])
      }
    } catch (err) {
      console.error('[reactions] toggle failed:', err.code || err.name, '—', err.message)
      toast.error("Couldn't react.")
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={pending || !user}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors disabled:opacity-60 ${
        iLiked
          ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:border-red-300 hover:text-red-400'
      }`}
    >
      <FiHeart className={`size-3.5 ${iLiked ? 'fill-current' : ''}`} />
      <span>{heartCount}</span>
    </button>
  )
}