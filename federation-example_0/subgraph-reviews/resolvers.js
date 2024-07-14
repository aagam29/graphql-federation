const resolvers = {
  Query: {
    latestReviews: (_, __, { dataSources }) => {
      return dataSources.reviewsAPI.getLatestReviews();
    }
  },
  Review: {
    location: (review) => {
      return { id: review.locationId }
    }
  },
  Location: {
    overallRating: (location, _, { dataSources }) => {
      return dataSources.reviewsAPI.getOverallRatingForLocation(location.id)
    },
    reviewsForLocation: (location, _, { dataSources }) => {
      return dataSources.reviewsAPI.getReviewsForLocation(location.id)
    },
  },
  Mutation: {
    submitReview: (_, { locationReview }, { dataSources }) => {
      const newReview = dataSources.reviewsAPI.submitReviewForLocation(locationReview);
      return { code: 200, success: true, message: 'success', locationReview: newReview };
    }
  }
};

module.exports = resolvers;
