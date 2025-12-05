import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Sneakers.css";
import ShoeCard from "./ShoeCard";

export default function Sneakers() {
    const [allSneakers, setAllSneakers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const BACKEND_URL = "https://p16-backend.onrender.com/api/sneakers";

    const handleSearch = async (e) => {
        e.preventDefault();
        const term = searchTerm.trim();
        if (!term) return;

        setLoading(true);
        setError("");

        const maxRetries = 3;
        const delayMs = 2000;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const url = new URL(BACKEND_URL);
                url.searchParams.set("limit", "200");
                url.searchParams.set("search", term);

                const resp = await fetch(url.toString());

                if (resp.status >= 500 && resp.status <= 599) {
                    console.warn(`Server error ${resp.status}, attempt ${attempt}`);
                    if (attempt === maxRetries) {
                        throw new Error("Server is temporarily unavailable.");
                    }
                    await new Promise((r) => setTimeout(r, delayMs));
                    continue;
                }

                if (!resp.ok) {
                    throw new Error(`Request failed with status ${resp.status}`);
                }

                const data = await resp.json();
                setAllSneakers(data);
                setLoading(false);
                return;
            } catch (err) {
                if (attempt === maxRetries) {
                    console.error(err);
                    setError(err.message || "Failed to load sneakers.");
                    setLoading(false);
                } else {
                    await new Promise((r) => setTimeout(r, delayMs));
                }
            }
        }
    };

    return (
        <div style={{ paddingTop: 80 }}>
            <Container fluid>
                <Row>
                    <h1 style={{ paddingBottom: 20 }}>Search Sneakers</h1>

                    {/* Search form */}
                    <form
                        onSubmit={handleSearch}
                        style={{ marginBottom: 30, width: "100%" }}
                    >
                        <input
                            type="text"
                            placeholder="Search by brand, model, etc."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: 8, width: 250, marginRight: 8 }}
                        />
                        <button type="submit">Search</button>
                    </form>

                    {loading && <h2>Sneaker Vault...</h2>}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {!loading &&
                        !error &&
                        allSneakers.map((shoe) => (
                            <Col key={shoe.styleID || shoe.shoeName}>
                                <ShoeCard
                                    brand={shoe.brand}
                                    shoeName={shoe.shoeName}
                                    colorway={shoe.colorway}
                                    thumbnail={shoe.thumbnail}
                                    retailPrice={shoe.retailPrice}
                                    silhoutte={shoe.silhoutte}
                                />
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    );
}
