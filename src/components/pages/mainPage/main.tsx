import { useEffect, useState } from 'react';

import Card, { cardInterface } from '../../card/card';
import { LoadingScreen } from '../../loading';
import './main.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/rootReducer';

import { setTags } from '../../../redux/reducers/apiSlice';
import TagSlider from '../../tagSlider';

export function Main() {
  const [allCards, setAllCards] = useState<Array<cardInterface>>([]);
  const { isScrolled } = useAppSelector((state) => state.apiSlice);
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.apiSlice.cards);

  const getTags = async () => {
    const tags = await fetch('./tags.json').then((res) => res.json());
    let shuffledTags: Array<string> = tags ? Array.from(Object.values(tags)) : [];
    shuffledTags = shuffledTags.sort(() => 0.5 - Math.random());
    const readyTags = shuffledTags.slice(0, 30);
    if (readyTags) {
      dispatch(setTags(readyTags));
    }

    console.log(readyTags);
  };

  useEffect(() => {
    if (cards) {
      if (!isScrolled) {
        setAllCards([]);
      }
      setAllCards((prev) => [...prev, ...cards]);
    }
  }, [cards]);
  useEffect(() => {
    getTags();
  }, []);

  return (
    <main data-testid="mainPage">
      <div className="wrapper">
        <TagSlider />
        <div
          className="cardsField"
          // style={isLoading ? { lineHeight: 'normal' } : { lineHeight: 0 }}
        >
          {allCards.length > 0 ? allCards.map((el, index) => <Card card={el} key={index} />) : ''}
        </div>
        {allCards.length < 1 ? (
          <div className="find-error">
            <img src="./icons/no-results.png" alt="" />
            <span>Oops, Sorry we couldn&apos;t find what you&apos;re looking for</span>
          </div>
        ) : (
          ''
        )}
      </div>
    </main>
  );
}
