import { Link } from 'react-router-dom';
import { CITIES } from '../../const';
import { useAppSelector } from '../../hooks';

type LocationsProps = {
  changeLocationHandler(activeLocation: string): void;
}

function Locations({changeLocationHandler}: LocationsProps): JSX.Element {
  const activeLocation = useAppSelector((state) => state.city);
  const classLocation = 'locations__item-link tabs__item';
  const classActiveLocation = `${classLocation} tabs__item--active`;

  const locationClickHandler = (evt: React.MouseEvent<HTMLElement>):void => {
    changeLocationHandler(evt.currentTarget.innerText);
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
