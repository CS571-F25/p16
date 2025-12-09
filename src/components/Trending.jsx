import { useState, useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import "./Sneakers.css";
import ShoeCard from "./ShoeCard";

export default function Trending(props) {

    const [allSneakers, setAllSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const BACKEND_URL = "https://p16-backend.onrender.com/api/sneakers";

    useEffect(() => {
        let cancelled = false;

        async function loadSneakers() {
            setLoading(true);
            setError("");

            const maxRetries = 3;
            const delayMs = 2000;

            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const resp = await fetch(`${BACKEND_URL}?limit=200`);

                    // If it's a 5xx, try again (keep showing "Loading...")
                    if (resp.status >= 500 && resp.status <= 599) {
                        console.warn(`Server error ${resp.status}, attempt ${attempt}`);
                        if (attempt === maxRetries) {
                            throw new Error("Server is temporarily unavailable.");
                        }
                        await new Promise((r) => setTimeout(r, delayMs));
                        continue; // go to next attempt
                    }

                    // Any non-5xx: stop loading and handle it
                    if (!resp.ok) {
                        throw new Error(`Request failed with status ${resp.status}`);
                    }

                    const data = await resp.json();

                    if (!cancelled) {
                        setAllSneakers(data);
                        setLoading(false);
                    }
                    return; // success, stop retrying
                } catch (err) {
                    // Network error / last retry failed
                    if (attempt === maxRetries && !cancelled) {
                        console.error(err);
                        setError(err.message || "Failed to load sneakers.");
                        setLoading(false);
                    } else {
                        // wait then retry
                        await new Promise((r) => setTimeout(r, delayMs));
                    }
                }
            }
        }
        loadSneakers();

        return () => {
            cancelled = true;
        };
    }, [BACKEND_URL]);

    if (loading) {
        return <h1>Sneaker Vault...</h1>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div style = {{paddingTop: 80}}>
            <Container fluid>
                <Row className="g-3">
                    <h1 style = {{paddingBottom: 40}}>Need more than Shoes? Trending Products on the Market!</h1>
                        {allSneakers.map((shoe, index) => (
                            <Col key={shoe.styleID || shoe.shoeName} xs={12} sm={6} md={4} lg={3}>
                                <ShoeCard 
                                    key = {shoe.make}
                                    styleID={shoe.styleID}
                                    brand = {shoe.brand}
                                    shoeName = {shoe.shoeName}
                                    colorway = {shoe.colorway}
                                    thumbnail = {shoe.thumbnail}
                                    retailPrice = {shoe.retailPrice}
                                    silhoutte = {shoe.silhoutte}
                                    id={shoe._id}
                                    index={index}
                                />
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    );
}