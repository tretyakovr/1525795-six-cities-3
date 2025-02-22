import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { sendCommentAction } from '../../store/api-actions';
import { resetFeedbackState } from '../../store/offer-data/offer-data';
import { getOfferDetail, getSendCommentActionState } from '../../store/offer-data/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { APIActionState, AppRoute } from '../../const';

const enum CommentLength {
    Min = 50,
    Max = 300,
}

function Feedback(): JSX.Element {
  const dispatch = useAppDispatch();

  const sendCommentState = useAppSelector(getSendCommentActionState);
  const [form, setForm] = useState({rating: 0, comment: ''});
  const commentText = useRef<HTMLTextAreaElement | null>(null);
  const refSubmit = useRef<HTMLButtonElement | null>(null);
  const refForm = useRef<HTMLFormElement | null>(null);

  const offerDetail = useAppSelector(getOfferDetail);

  let starsDisabled = sendCommentState === APIActionState.Call;

  useEffect(() => {
    if (sendCommentState === APIActionState.Idle) {
      if (refSubmit.current !== null) {
        refSubmit.current.disabled = !(form.rating !== 0 && +CommentLength.Min <= +form.comment.length && +form.comment.length <= +CommentLength.Max);
      }
    }

    if (sendCommentState === APIActionState.Call) {
      if (refSubmit.current !== null && commentText.current !== null) {
        refSubmit.current.disabled = true;
        commentText.current.disabled = true;
      }
    }

    if (sendCommentState === APIActionState.Success) {
      if (refSubmit.current !== null && refForm.current !== null && commentText.current !== null) {
        refForm.current.reset();
        setForm({...form, rating: 0, comment: ''});
        commentText.current.disabled = false;
        dispatch(resetFeedbackState());
      }
    }

    if (sendCommentState === APIActionState.Error) {
      if (refSubmit.current !== null && commentText.current !== null) {
        commentText.current.disabled = false;
        refSubmit.current.disabled = false;
      }
    }
  }, [sendCommentState, form, dispatch, starsDisabled]);

  if (offerDetail === undefined) {
    return (<Navigate to={AppRoute.Page404} />);
  }
  const offerId = offerDetail.id;
  const handleCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => setForm({...form, comment: evt.target.value});

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement> | undefined) => {
    if (evt !== undefined) {
      evt.preventDefault();
    }
    if (refSubmit.current !== null && commentText.current !== null) {
      starsDisabled = true;
      commentText.current.disabled = true;
      refSubmit.current.disabled = true;
      dispatch(sendCommentAction({offerId: offerId, comment: String(form.comment), rating: form.rating}));
    }
  };

  return (
    <form ref={refForm} className="reviews__form form" action="#" method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        { Object.entries({1: 'terribly', 2: 'badly', 3: 'not bad', 4: 'good', 5: 'perfect'}).reverse().map(([key, value]) => (
          <>
            <input key={key} onClick={() => setForm({...form, rating: +key})}
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
