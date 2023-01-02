import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Review from 'components/Review/Review';
import { getMoviesReviews } from 'utils/fetchAPI';

const Reviews = () => {
  const { id } = useParams();
  //  const location = useLocation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const setUpReviews = () => {
      debugger;
      console.log(id);
      if (!id) return;
      getMoviesReviews(id)
        .then(data => {
          if (!data) return;
          setReviews(data);
          debugger;
          console.log(data);
        })
        .catch(error => console.log(error));
    };
    setUpReviews();
  }, []);

  debugger;
  return (
    <div>
      {/* {reviews.length === 0 ? (
        <p>There are no any reviews for this movie...</p>
      ) : (
        reviews.map(review => <Review key={review?.id} review={review} />)
      )} */}
    </div>
  );
};

export default Reviews;
