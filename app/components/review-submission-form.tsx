'use client'

import { useState } from 'react'
import { useTheme } from './theme-provider'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Label } from '@/app/components/ui/label'
import { Star } from 'lucide-react'
import { FormEvent } from 'react'

interface ReviewSubmissionFormProps {
  onSubmit: () => void
}

export default function ReviewSubmissionForm({ onSubmit }: ReviewSubmissionFormProps) {
  const theme = useTheme()
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the review data to your backend
    if (typeof onSubmit === 'function') {
      await onSubmit()
    }
    setName('')
    setRating(0)
    setReview('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={`bg-[${theme.colors.surface}] text-[${theme.colors.text}]`}
        />
      </div>
      <div>
        <Label>Rating</Label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
              style={{ color: star <= rating ? theme.colors.primary : theme.colors.textMuted }}
            >
              <Star className="w-6 h-6" fill={star <= rating ? theme.colors.primary : 'none'} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="review">Review</Label>
        <Textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          className={`bg-[${theme.colors.surface}] text-[${theme.colors.text}]`}
          rows={4}
        />
      </div>
      <Button 
        type="submit" 
        className={`w-full bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}] hover:bg-[${theme.colors.primary}]/90`}
      >
        Submit Review
      </Button>
    </form>
  )
}

