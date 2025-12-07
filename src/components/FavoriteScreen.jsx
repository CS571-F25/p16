import { Col, Container, Row } from "react-bootstrap";
import { useFavorites } from "../contexts/FavoriteContext";
import ShoeCard from "./ShoeCard";

function FavoriteScreen() {
    const { favorites } = useFavorites();
    
    // Adjust column sizes based on # of shoes in favorites --> because UI fails when there is just 1 or 2 shoes
    const getColProps = () => {
      if (favorites.length === 1) {
        return { xs: 12, sm: 12, md: 8, lg: 6 };
      } else if (favorites.length === 2) {
        return { xs: 12, sm: 6, md: 6, lg: 6 };
      } else {
        return { xs: 12, sm: 6, md: 4, lg: 3 };
      }
    };
    
    return (
      <div style={{paddingTop: 80}}>
        <Container fluid>
          <Row className="g-3 justify-content-center">
            {
              favorites.length > 0 ?
                favorites.map(shoe => (
                  <Col key={shoe.id || shoe.styleID} {...getColProps()}>
                    <ShoeCard 
                       styleID={shoe.styleID}
                       brand={shoe.brand}
                       shoeName={shoe.shoeName}
                       colorway={shoe.colorway}
                       thumbnail={shoe.thumbnail}
                       retailPrice={shoe.retailPrice}
                       silhoutte={shoe.silhoutte}
                       id={shoe.id}
                    />
                  </Col>
                ))
              :
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h4>No favorite shoes yet</h4>
                <p className="text-muted">Start adding shoes to your favorites to see them here!</p>
              </div>
            }
          </Row>
        </Container>
      </div>
    )
}

export default FavoriteScreen;