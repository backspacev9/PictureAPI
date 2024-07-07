export interface IQuery {
  key: string;
  value: number | string;
}

export const createQuery = (parameters: Array<IQuery> = []) =>
  parameters.length ? `?${parameters.map((x) => `${x.key}=${x.value}`).join('&')}` : '';
