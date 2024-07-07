import { Component } from 'react';
import { iconsPath } from '../constants';

export function LoadingScreen() {
  return <img className="loadingImg" src={iconsPath.loading} alt="" />;
}
