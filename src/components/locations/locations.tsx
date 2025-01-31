import { Link } from 'react-router-dom';
import { store } from '../../store';
import { CITIES } from '../../const';
// import { changeLocation } from '../../store/action';

type LocationsProps = {
  changeLocationHandler(activeLocation: string): void;
}

function Locations({changeLocationHandler}: LocationsProps): JSX.Element {
// function Locations(): JSX.Element {
  const activeLocation = store.getState().city;
  // const locations = CITIES;
  const classLocation = 'locations__item-link tabs__item';
  const classActiveLocation = `${classLocation} tabs__item--active`;

  const locationClickHandler = (evt: React.MouseEvent<HTMLElement>):void => {
    changeLocationHandler(evt.currentTarget.innerText);
    // const newLocation = evt.currentTarget.innerText;
    // store.dispatch(changeLocation(newLocation));
    // ??? Можно ли здесь обойтись без передачи события выше и использования useState, а просто вызвать store.dispatch()?
  };

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((item) => (
        <li key={item} className="locations__item">
          <Link className=
            {
              item === activeLocation ? classActiveLocation : classLocation
            } to="/" onClick={locationClickHandler}
          >
            <span>{item}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}


export default Locations;
