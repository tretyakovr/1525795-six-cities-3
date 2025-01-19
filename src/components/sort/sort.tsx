import { SortTypes } from '../../const';
import { store } from '../../store';
import { changeSort } from '../../store/action';

function Sort(): JSX.Element {
  let currentSortType = store.getState().sortType;

  function handleSortClick(): void {
    const sortMenu = document.querySelector('.places__options');
    sortMenu?.classList.add('places__options--opened');
  }

  function handleChangeSort(evt: React.MouseEventHandler<HTMLElement>): void {
    const sortMenu = document.querySelector('.places__options');
    if (sortMenu) {
      sortMenu.classList.remove('places__options--opened');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    store.dispatch(changeSort(evt.target.innerText));
    currentSortType = store.getState().sortType;
  }

  return (
    <>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortClick}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" >
        {Object.entries(SortTypes).map(([key, value]) => (
          <li key={key}
            className={value === currentSortType ? 'places__option places__option--active' : 'places__option'}
            tabIndex={0}
            onClick={handleChangeSort}
          >{value}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sort;
