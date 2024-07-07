import './card.scss';

export interface cardProps {
  card: cardInterface;
}
export interface cardInterface {
  id: number;
  src: {
    large: string;
    small: string;
    medium: string;
    original: string;
  };
  alt: string;
  photographer: string;
}

export default function Card(cardProps: cardProps) {
  //const { stateApi, dispatchApi } = useContext(ApiContext);
  // const dispatch = useAppDispatch();
  // const showPopup = () => {
  //   dispatch(setCurrentCard(cardProps.card));
  // };
  return (
    <div className="card" data-testid="card">
      <a
        className="btnDownload"
        href={cardProps.card.src.original}
        download
        target="_blank"
        rel="noreferrer"
      >
        <img src="./icons/download.svg" alt="" />
      </a>
      <img className="mainPicture" src={cardProps.card.src.large} alt={cardProps.card.alt} />
      <div className="cardContent">
        <span className="text">{cardProps.card.alt ? cardProps.card.alt : ''}</span>
        <div className="footerContent">
          <span className="name">{cardProps.card.photographer}</span>
        </div>
      </div>
    </div>
  );
}
