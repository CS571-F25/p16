import { Card, Button, ButtonGroup } from "react-bootstrap";
import "./ShoeCard.css"

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
    <Card className = "shoe-card"> 
      <Card.Img variant="top" src={thumbnail} alt = {silhoutte} className = "shoe-img"/>
      <Card.Body>
        {shoeName ? <Card.Title>{shoeName}</Card.Title> : <></>}
        {colorway ? <Card.Text>{`Color: ${colorway}`}</Card.Text> : <></>}
        {brand ? <Card.Text>{`Brand: ${brand}`}</Card.Text>: <></>}
        {retailPrice ? <Card.Text>{`Price: $${retailPrice}`}</Card.Text> : <></>}

        {/* TODO: 1) Add the prices & links to buy below 'Price' and fix card object spacing as needed, 2) Fix card object properties as deemed necessary*/}
      </Card.Body>
    </Card>
  )
}

export default ShoeCard;