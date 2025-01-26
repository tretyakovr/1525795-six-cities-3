import { useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import { SortTypes } from '../../const';
import { store } from '../../store';
import { changeSort } from '../../store/action';

function Sort(): JSX.Element {
  const [currentSortType, setCurrentSortType] = useState(store.getState().sortType);
  const refSortMenu: React.MutableRefObject<HTMLUListElement | null> = useRef<HTMLUListElement | null>(null);
  // let currentSortType = store.getState().sortType;
  // const sortTypeSelector = useSelector((currentSortType) => {

  // });

  function handleSortClick(): void {
    if (refSortMenu.current) {
      refSortMenu.current.classList.toggle('places__options--opened');
    }
  }

  function handleChangeSort(evt: React.MouseEvent<HTMLLIElement>) {
    if (refSortMenu.current) {
      refSortMenu.current.classList.toggle('places__options--opened');
    }

    // const sortMenu = document.querySelector('.places__options');
    // if (sortMenu) {
    //   console.log(refSortMenu);
    //   refSortMenu.classList.remove('places__options--opened');
    //   // sortMenu.classList.remove('places__options--opened');
    // }

    // Здесь диспатчим новое значение сортировки и перерисовываем название типа сортировки
    const target = evt.target as HTMLLIElement;
    const itemText = target.innerText as SortTypes;
    store.dispatch(changeSort(itemText));
    setCurrentSortType(store.getState().sortType);
    // console.log('new sort', store.getState().sortType);
    // currentSortType = store.getState().sortType;
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
      <ul ref={refSortMenu} className="places__options places__options--custom" >
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
