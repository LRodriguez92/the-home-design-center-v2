'use client'

import { useState } from 'react'
import { useTheme } from './theme-provider'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardFooter } from '@/app/components/ui/card'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  status: 'pending' | 'approved' | 'rejected'
}

const initialReviews: Review[] = [
  { id: 1, name: 'John Doe', rating: 5, comment: 'Great service!', status: 'pending' },
  { id: 2, name: 'Jane Smith', rating: 4, comment: 'Very satisfied with the results.', status: 'pending' },
  { id: 3, name: 'Bob Johnson', rating: 3, comment: 'Good, but could be better.', status: 'pending' },
]

export default function ReviewApproval() {
  const theme = useTheme()
  const [reviews, setReviews] = useState<Review[]>(initialReviews)

  const handleApprove = (id: number) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, status: 'approved' } : review
    ))
  }

  const handleReject = (id: number) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, status: 'rejected' } : review
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-semibold mb-4 text-[${theme.colors.text}]`}>Review Management</h2>
        <p className={`text-sm text-[${theme.colors.textMuted}]`}>
          Approve or reject customer reviews before they appear on the website
        </p>
      </div>
      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review.id} className={`bg-transparent border-2 border-[${theme.colors.primary}]`}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className={`font-semibold text-[${theme.colors.text}]`}>{review.name}</p>
                  <p className={`text-sm text-[${theme.colors.textMuted}]`}>Rating: {review.rating}/5</p>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  review.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                  review.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                  'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </span>
              </div>
              <p className={`text-[${theme.colors.text}]`}>{review.comment}</p>
            </CardContent>
            {review.status === 'pending' && (
              <CardFooter className="justify-end space-x-2">
                <Button
                  onClick={() => handleApprove(review.id)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleReject(review.id)}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Reject
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

