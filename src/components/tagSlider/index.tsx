import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/rootReducer';

import './tagSlider.scss';
import { createRef, useEffect, useState } from 'react';
import { searchSlice } from '../../redux/reducers/searchSlice';

function TagSlider() {
  const [slides, setSlides] = useState<Array<string>>([]);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const { tags } = useAppSelector((state) => state.apiSlice);
  const { setText } = searchSlice.actions;
  const dispatch = useAppDispatch();
  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setSlides(tags);
  }, [tags]);

  const slideClick = (ev: React.MouseEvent<HTMLElement> | undefined) => {
    const target = ev?.target as HTMLElement;
    dispatch(setText(target.innerText));
  };

  const handleMouseDown = (ev: React.MouseEvent<HTMLElement>) => {
    setIsMouseDown(true);
    if (containerRef.current) {
      setStartX(ev.pageX - -containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (ev: React.MouseEvent<HTMLElement>) => {
    if (!isMouseDown) return;
    ev.preventDefault();
    if (containerRef.current) {
      const x = ev.pageX - containerRef.current.offsetLeft;
      const step = x - startX;
      containerRef.current.scrollLeft = scrollLeft - step;
    }
  };
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const scrollSlider = (ev: React.MouseEvent<HTMLElement> | undefined) => {
    const target = ev?.target as HTMLElement;
    const scrollStep = 400;

    if (target.className == 'btn-right' && containerRef.current) {
      containerRef.current.scrollLeft += scrollStep;
    }
    if (target.className == 'btn-left' && containerRef.current) {
      containerRef.current.scrollLeft -= scrollStep;
    }
  };

  return (
    <div className="tagSlider">
      <img className="btn-left" src="./icons/btnArrow.svg" alt="" onClick={scrollSlider} />
      <div
        className="slidesContainer"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={isMouseDown ? { scrollBehavior: 'auto', cursor: 'grab' } : {}}
      >
        {slides.map((el, index) => (
          <span
            key={index}
            className="slide"
            onClick={slideClick}
            style={isMouseDown ? { cursor: 'grab' } : {}}
          >
            {el.toString()}
          </span>
        ))}
      </div>
      <img className="btn-right" src="./icons/btnArrow.svg" alt="" onClick={scrollSlider} />
    </div>
  );
}

export default TagSlider;
