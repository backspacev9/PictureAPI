import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/rootReducer';
import { baseUrl, fetchData } from '../../api';
import { FILTER_QUERY } from '../../constants';
import {
  setOrientation,
  setColor,
  setQuery,
  setPage,
  setIsScrolled,
} from '../../redux/reducers/apiSlice';
import './controlPanel.scss';
import { createQuery } from '../../utils/queryMaker';

function ControlPanel() {
  const dispatch = useAppDispatch();
  const { nextUrlPage, sorting, isLoading, query, cards } = useAppSelector(
    (state) => state.apiSlice
  );
  const page = useAppSelector((state) => state.apiSlice.page);
  const text = useAppSelector((state) => state.searchSlice.text);

  const makeQuery = () => {
    const startQuery = createQuery([
      { key: 'page', value: page },
      {
        key: 'query',
        value: text !== '' ? text : 'random',
      },
    ]);
    //const order = sorting.orderBy ? `&order_by=${sorting.orderBy}` : '';
    const orientation = sorting.orientation ? `&orientation=${sorting.orientation}` : '';
    const color = sorting.color ? `&color=${sorting.color}` : '';
    const query = baseUrl + startQuery + orientation + color;
    console.log('query', query);
    return query;
  };

  const onSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (ev.target.id === 'orientation') {
      const value = ev.currentTarget.value !== 'all' ? ev.currentTarget.value : '';
      dispatch(setOrientation(value));
    }
    if (ev.target.id === 'color') {
      const value = ev.currentTarget.value !== 'all' ? ev.currentTarget.value : '';
      dispatch(setColor(value));
    }

    //
  };

  useEffect(() => {
    dispatch(setIsScrolled(false));
    dispatch(setPage(1));
    dispatch(setQuery(makeQuery()));
    window.scrollTo(0, 0);
    console.log('text sorting');
  }, [text, sorting]);

  useEffect(() => {
    dispatch(fetchData());
    console.log('fetch');
    console.log('next from affter query ', nextUrlPage);
  }, [query]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      dispatch(setQuery(nextUrlPage));
      dispatch(setIsScrolled(true));
      console.log('scrolled');
      console.log('next ', nextUrlPage);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cards]);

  return (
    <div className="controlContainer">
      <div className="sortingCotainer">
        <div className="sel">
          <select
            id="orientation"
            className="orientationSelect"
            value={sorting.orientation}
            onChange={(ev) => onSelectChange(ev)}
          >
            {FILTER_QUERY.orientation.map((el, index) => (
              <option key={index}>{el}</option>
            ))}
          </select>
        </div>
        <div className="sel">
          <select
            id="color"
            className="colorSelect"
            value={sorting.color}
            onChange={(ev) => onSelectChange(ev)}
          >
            {FILTER_QUERY.colors.map((el, index) => (
              <option style={{ backgroundColor: el }} key={index}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
