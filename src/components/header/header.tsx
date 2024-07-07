import './header.scss';
import { Search } from '../search/search';
import ControlPanel from './controlPanel';

export function Header() {
  return (
    <header>
      <Search />
      <ControlPanel />
    </header>
  );
}
