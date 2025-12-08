import { Card, Button, ButtonGroup } from "react-bootstrap";
import "./ShoeCard.css"
import FavoriteButton from "./FavoriteButton";

function ShoeCard(props) {

  // Basic Display of a card
  let styleID = props.styleID;
  let brand = props.brand;
  let shoeName = props.shoeName;
  let colorway = props.colorway;
  let thumbnail = props.thumbnail;
  let retailPrice = props.retailPrice;
  let resellLinks = props.resellLinks;

  // ALT image
  let silhoutte = props.silhoutte;

  // Create a shoe object to pass to FavoriteButton
  const shoe = {
    styleID: props.styleID,
    shoeName: props.shoeName,
    brand: props.brand,
    colorway: props.colorway,
    thumbnail: props.thumbnail,
    retailPrice: props.retailPrice,
    silhoutte: props.silhoutte,
    id: props.id
  };

  return (
    <Card className="h-100 position-relative"> 
      <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10 }}>
        <FavoriteButton shoe={shoe} />
      </div>
      <Card.Img variant="top" src={thumbnail} alt={silhoutte} style={{ objectFit: 'contain', height: '150px', padding: '8px' }} />
      <Card.Body className="d-flex flex-column p-2">
        {shoeName ? <Card.Title className="fs-6 mb-2">{shoeName}</Card.Title> : <></>}
        {colorway ? <Card.Text className="small mb-1">{`Color: ${colorway}`}</Card.Text> : <></>}
        {brand ? <Card.Text className="small mb-1">{`Brand: ${brand}`}</Card.Text>: <></>}
        {retailPrice ? <Card.Text className="small mt-auto fw-bold">{`Retail Price: $${retailPrice}`}</Card.Text> : <></>}
      </Card.Body>
    </Card>
  )
}

export default ShoeCard;