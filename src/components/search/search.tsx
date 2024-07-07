import './search.scss';
import { useAppDispatch, useAppSelector } from '../../redux/rootReducer';

import { searchSlice } from '../../redux/reducers/searchSlice';

export function Search() {
  const { text } = useAppSelector((state) => state.searchSlice);
  const { setText } = searchSlice.actions;
  const dispatch = useAppDispatch();

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setText(e.currentTarget.value));
  };

  return (
    <div className="searchContainer">
      <input type="text" placeholder="random" onChange={onChangeHandle} value={text} />
    </div>
  );
}
