import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { sendCommentAction } from '../../store/api-actions';
import { resetFeedbackState } from '../../store/offer-data/offer-data';
import { getOfferDetail, sendCommentActionState } from '../../store/offer-data/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { APIActionState, AppRoute } from '../../const';

const DEFAULT_MIN_LENGTH = 50;
const DEFAULT_MAX_LENGTH = 300;


function Feedback(): JSX.Element {
  // let starsDisabled = false;
  const dispatch = useAppDispatch();
  const sendCommentState = useAppSelector(sendCommentActionState);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const commentText = useRef<HTMLTextAreaElement | null>(null);
  const refSubmit = useRef<HTMLButtonElement | null>(null);
  const refForm = useRef<HTMLFormElement | null>(null);

  const offerDetail = useAppSelector(getOfferDetail);
  // const [starsDisabled, setStarsDisabled ] = useState(false); //sendCommentState === APIActionState.CALL;

  let starsDisabled = sendCommentState === APIActionState.Call;
  console.log('stars', sendCommentState, starsDisabled);

  useEffect(() => {
    // if (sendCommentState === APIActionState.CALL) {
    //   starsDisabled = true;
    // }

    if (refSubmit.current !== null) {
      refSubmit.current.disabled = !(rating !== 0 && comment.length >= DEFAULT_MIN_LENGTH && comment.length <= DEFAULT_MAX_LENGTH);
    }

    if (sendCommentState === APIActionState.Call) {
      if (refSubmit.current !== null && commentText.current !== null) {
        refSubmit.current.disabled = true;
        commentText.current.disabled = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        starsDisabled = true;
      }
    }
    if (sendCommentState === APIActionState.Success) {
      if (refSubmit.current !== null && refForm.current !== null && commentText.current !== null) {
        refForm.current.reset();
        commentText.current.disabled = false;
        starsDisabled = false;
        setRating(0);
        setComment('');
        dispatch(resetFeedbackState());
      }
    }
    if (sendCommentState === APIActionState.Error) {
      if (refSubmit.current !== null && commentText.current !== null) {
        commentText.current.disabled = false;
        starsDisabled = false;
        refSubmit.current.disabled = false;
      }
    }
  }, [rating, comment, sendCommentState, dispatch]);


  if (offerDetail === undefined) {
    return (<Navigate to={AppRoute.Page404} />);
  }
  const offerId = offerDetail.id;

  const handleCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setComment(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement> | undefined) => {
    if (evt !== undefined) {
      evt.preventDefault();
    }
    if (refSubmit.current !== null && commentText.current !== null) {
      commentText.current.disabled = true;
      refSubmit.current.disabled = true;
      // setStarsDisabled(true);
      starsDisabled = true;
      console.log(starsDisabled);
    }
    dispatch(sendCommentAction({offerId: offerId, comment: String(comment), rating: rating}));
  };

  return (
    <form ref={refForm} className="reviews__form form" action="#" method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        { Object.entries({1: 'terribly', 2: 'badly', 3: 'not bad', 4: 'good', 5: 'perfect'}).reverse().map(([key, value]) => (
          <>
            <input key={key} onChange={() => setRating(+key)}
              className="form__rating-input visually-hidden"
              name="rating" value={key} id={`${key}-stars`} type="radio"
              multiple disabled={starsDisabled}
            />
            <label htmlFor={`${key}-stars`} className="reviews__rating-label form__rating-label" title={value}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </>))}
      </div>
      <textarea ref={commentText}
        onChange={handleCommentChange}
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
