import { useRef, useState } from 'react';
// import { sendCommentAction } from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsResetFeedback } from '../../store/offer-data/selectors';
import { changeResetFeedback } from '../../store/offer-data/offer-data';

const DEFAULT_MIN_LENGTH = 50;
const DEFAULT_MAX_LENGTH = 300;

// type FeedbackProps = {
//   offerId: string;
// }

// function Feedback(props: FeedbackProps): JSX.Element {
function Feedback(): JSX.Element {
  // const {offerId} = props;
  const [rating, setRating] = useState<number>(0);
  const commentText = useRef<HTMLTextAreaElement | null>(null);
  const refSubmit = useRef<HTMLButtonElement | null>(null);
  const refForm = useRef<HTMLFormElement | null>(null);

  const dispatch = useAppDispatch();
  const isResetFeedback = useAppSelector(getIsResetFeedback);

  if (refSubmit.current !== null) {
    refSubmit.current.disabled = true;
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement> | undefined) => {
    if (evt !== undefined) {
      evt.preventDefault();
    }
    if (refSubmit.current !== null && refForm.current !== null && commentText.current !== null) {
      refForm.current.disabled = true;
      commentText.current.disabled = true;
      refSubmit.current.disabled = true;
    }
    // dispatch(sendCommentAction({offerId: offerId, comment: String(commentText.current?.value), rating: rating}));
  };

  if (isResetFeedback) {
    if (refSubmit.current !== null && refForm.current !== null && commentText.current !== null) {
      refForm.current.reset();
      commentText.current.disabled = false;
      dispatch(changeResetFeedback({isResetFeedback: false}));
    }
  }

  const handleChange = () => {
    if (refSubmit.current !== null) {
      refSubmit.current.disabled = !(commentText.current !== null && rating !== 0 &&
        commentText.current.value.length >= DEFAULT_MIN_LENGTH &&
        commentText.current.value.length <= DEFAULT_MAX_LENGTH);
    }
  };

  return (
    <form ref={refForm} className="reviews__form form" action="#" method="post"
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onChange={() => setRating(5)} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={() => setRating(4)} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={() => setRating(3)} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={() => setRating(2)} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={() => setRating(1)} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea ref={commentText}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          ref={refSubmit}
          className="reviews__submit form__submit button"
          type="submit"
        >Submit
        </button>
      </div>
    </form>
  );
}

export default Feedback;
