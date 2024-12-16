import React, { useState } from 'react';
import axios from 'axios';
import { Star, Send } from 'lucide-react';

const ReviewSubmission = () => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!reviewText || rating === 0 || !email || !licensePlate) {
      setSubmitStatus('Please fill in all fields and select a rating');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await axios.post(
        `https://localhost:7273/api/Review/give-review?email=${encodeURIComponent(email)}&licensePlate=${encodeURIComponent(licensePlate)}`,
        {
          reviewText,
          rating
        },
        {
          headers: {
            'accept': 'text/plain',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'), // Assuming token is stored in localStorage
            'Content-Type': 'application/json'
          }
        }
      );

      setSubmitStatus('Review submitted successfully!');
      // Reset form
      setReviewText('');
      setRating(0);
      setEmail('');
      setLicensePlate('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
        Share Your Experience
      </h2>
      <form onSubmit={handleSubmitReview} className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* License Plate Input */}
        <div>
          <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            License Plate Number
          </label>
          <input
            type="text"
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="Enter vehicle license plate"
            required
          />
        </div>

        {/* Rating Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Rating
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((starRating) => (
              <Star
                key={starRating}
                className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                  starRating <= rating 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                onClick={() => handleRatingChange(starRating)}
              />
            ))}
          </div>
        </div>

        {/* Review Text Area */}
        <div>
          <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Review
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            rows="4"
            placeholder="Tell us about your experience..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-6 py-3 items-center space-x-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex justify-center disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Review
            </>
          )}
        </button>

        {/* Status Message */}
        {submitStatus && (
          <p className={`text-center mt-4 ${
            submitStatus.includes('successfully') 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {submitStatus}
          </p>
        )}
      </form>
    </div>
  );
};

export default ReviewSubmission;