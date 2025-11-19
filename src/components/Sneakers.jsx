import { useState, useEffect } from 'react';

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
        return <p>Loading sneakers, please wait…</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h1>Trending Sneakers</h1>
            <ul>
                {allSneakers.map((shoe) => (
                    <li key={shoe.styleID || shoe.shoeName}>
                        {shoe.brand ? `${shoe.brand} ` : ""}
                        {shoe.shoeName}
                        {shoe.retailPrice ? ` – $${shoe.retailPrice}` : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
}