import { Card, Button, ButtonGroup } from "react-bootstrap";
import "./ShoeCard.css"
import FavoriteButton from "./FavoriteButton";

function ShoeCard(props) {

  // Basic Display of a card
  let brand = props.brand;
  let shoeName = props.shoeName;
  let colorway = props.colorway;
  let thumbnail = props.thumbnail;
  let retailPrice = props.retailPrice;

  // ALT image
  let silhoutte = props.silhoutte;

  return (
    <Card className="h-100"> 
      <Card.Img variant="top" src={thumbnail} alt={silhoutte} style={{ objectFit: 'contain', height: '150px', padding: '8px' }} />
      <Card.Body className="d-flex flex-column p-2">
        {shoeName ? <Card.Title className="fs-6 mb-2">{shoeName}</Card.Title> : <></>}
        {colorway ? <Card.Text className="small mb-1">{`Color: ${colorway}`}</Card.Text> : <></>}
        {brand ? <Card.Text className="small mb-1">{`Brand: ${brand}`}</Card.Text>: <></>}
        {retailPrice ? <Card.Text className="small mt-auto fw-bold">{`Price: $${retailPrice}`}</Card.Text> : <></>}

        {/* TODO: 1) Add the prices & links to buy below 'Price' and fix card object spacing as needed, 2) Fix card object properties as deemed necessary*/}
      </Card.Body>
    </Card>
  )
}

export default ShoeCard;