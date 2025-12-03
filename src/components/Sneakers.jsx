import { useState, useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import "./Sneakers.css";
import ShoeCard from "./ShoeCard";

export default function Sneakers(props) {

    const [allSneakers, setAllSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const BACKEND_URL = "https://p16-backend.onrender.com/api/sneakers";

    // useEffect(() => {
    //     fetch("https://p16-backend.onrender.com/api/sneakers?limit=200")
    //     .then(resp => {
    //         if (!pres.ok) {
    //             throw new Error(`Request failed with status ${resp.status}`);
    //         }
    //         return resp.json();
    //     })
    //     .then(data => {
    //         console.log("Sneakers from backend:", data);
    //         setAllSneakers(data);
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //         alert("No products found or server error");
    //     });
    // }, []);
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
                    // console.log("API RESPONSE:", data);

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
                <Row>
                    <h1 style = {{paddingBottom: 40}}> Trending Sneakers</h1>
                        {console.log(allSneakers)}
                        {/* TODO: 1) Get all Sneakers (+ implement Pagination - LATER), 2) Implement Filtering Logic with Search Bar below "Trending Sneakers", 3) Implement Filtering Logic on LHS by Brand, Price, Color, 4) Add a 'My Shoes' page*/}
                        {/* General TODO: fix any spacing/coloring to be consistent for any device*/}
                        {allSneakers.map((shoe) => (
                            <Col>
                                <ShoeCard 
                                    key = {shoe.make}
                                    brand = {shoe.brand}
                                    shoeName = {shoe.shoeName}
                                    colorway = {shoe.colorway}
                                    thumbnail = {shoe.thumbnail}
                                    retailPrice = {shoe.retailPrice}
                                    silhoutte = {shoe.silhoutte}
                                />
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    );
}