import { useState } from "react";
import { Container, Row, Col, Pagination, Form, Button } from "react-bootstrap";
import "./Sneakers.css";
import ShoeCard from "./ShoeCard";
import FilterPanel from "./FilterPanel";


export default function Sneakers() {
    const [allSneakers, setAllSneakers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // variables to track the available filtering fields
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [prices, setPrices] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filtersActive, setFiltersActive] = useState(false);

    // variable for pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 15;

    // Get the data to paginate
    const dataToPaginate = filtersActive ? filtered : allSneakers;
    const totalPages = Math.ceil(dataToPaginate.length / itemsPerPage);
    const display = dataToPaginate.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const BACKEND_URL = "https://p16-backend.onrender.com/api/sneakers";
    

    function handleFilter(filteredObj) {
      let toFilter = [...allSneakers];

      // Check if any filters are actually applied
      const hasFilters = 
        (filteredObj.brands && filteredObj.brands.length > 0) ||
        (filteredObj.colors && filteredObj.colors.length > 0) ||
        filteredObj.maxPrice ||
        filteredObj.minPrice ||
        filteredObj.sort;

      // if a brand was filtered
      if (filteredObj.brands && filteredObj.brands.length > 0) {
        toFilter = toFilter.filter(shoe => 
          shoe.brand && filteredObj.brands.includes(shoe.brand)
        );
      }

      // if colors were selected
      if (filteredObj.colors && filteredObj.colors.length > 0) {
        toFilter = toFilter.filter(shoe => {
          if (!shoe.colorway) return false;
          const colorwayLower = shoe.colorway.toLowerCase();
          // Check if any selected color appears in the colorway
          return filteredObj.colors.some(color => 
            colorwayLower.includes(color.toLowerCase())
          );
        });
      }

      // if a max price was selected
      if (filteredObj.maxPrice) {
        toFilter = toFilter.filter(shoe => 
          shoe.retailPrice && shoe.retailPrice <= filteredObj.maxPrice
        );
      }

      // if a min price was selected
      if (filteredObj.minPrice) {
        toFilter = toFilter.filter(shoe => 
          shoe.retailPrice && shoe.retailPrice >= filteredObj.minPrice
        );
      }

      // if a sorting preference was selected
      if (filteredObj.sort) {
        switch(filteredObj.sort) {
          case "price-low":
            toFilter.sort((a, b) => {
              const priceA = a.retailPrice || 0;
              const priceB = b.retailPrice || 0;
              return priceA - priceB;
            });
            break;
          case "price-high":
            toFilter.sort((a, b) => {
              const priceA = a.retailPrice || 0;
              const priceB = b.retailPrice || 0;
              return priceB - priceA;
            });
            break;
          case "name-asc":
            toFilter.sort((a, b) => {
              const nameA = (a.shoeName || "").toLowerCase();
              const nameB = (b.shoeName || "").toLowerCase();
              return nameA.localeCompare(nameB);
            });
            break;
          case "name-desc":
            toFilter.sort((a, b) => {
              const nameA = (a.shoeName || "").toLowerCase();
              const nameB = (b.shoeName || "").toLowerCase();
              return nameB.localeCompare(nameA);
            });
            break;
          case "brand":
            toFilter.sort((a, b) => {
              const brandA = (a.brand || "").toLowerCase();
              const brandB = (b.brand || "").toLowerCase();
              return brandA.localeCompare(brandB);
            });
            break;
          default:
            break;
        }
      }

      setFiltersActive(hasFilters);
      setFiltered(toFilter);
      setPage(1); // Reset to first page when filters change
    }


    function findBrands(data) {
      const uniqueBrands = new Set();
      data.forEach(clothObj => {
        if (clothObj.brand) {
          uniqueBrands.add(clothObj.brand);
        }
      });
      setBrands(Array.from(uniqueBrands).sort());
    }

    function findColors(data) {
      // Hardcoded list of clothing colors
      const commonColors = [
        'black', 'white', 'gray', 'grey', 'red', 'blue', 'green', 'yellow',
        'orange', 'purple', 'pink', 'brown', 'beige', 'tan', 'navy', 'maroon',
        'burgundy', 'olive', 'khaki', 'cream', 'ivory', 'silver', 'gold', 'bronze'
      ];

      const uniqueColors = new Set();

      data.forEach(clothObj => {
        if (clothObj.colorway) {
          let toAdd = clothObj.colorway.split("/");
          toAdd.forEach(color => {
            const trimmedColor = color.trim().toLowerCase();
            // if the color contains any of the commoncolors
            const matchesCommonColor = commonColors.some(commonColor => 
              trimmedColor.includes(commonColor) || commonColor.includes(trimmedColor)
            );
            
            if (matchesCommonColor) {
              // Find the matching common color and add it
              const matchedColor = commonColors.find(commonColor => 
                trimmedColor.includes(commonColor) || commonColor.includes(trimmedColor)
              );
              if (matchedColor) {
                uniqueColors.add(matchedColor);
              }
            }
          });
        }
      });

      setColors(Array.from(uniqueColors).sort())
    }

    function findPrices(data) {
      const uniquePrices = new Set();

      data.forEach( clothObj => {
        if (clothObj.retailPrice) {
          uniquePrices.add(Number(clothObj.retailPrice))
        }
      })
      setPrices(Array.from(uniquePrices).sort((a, b) => a - b));
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setAllSneakers([]);
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
                setFiltered([]); // Reset filtered results on new search
                setFiltersActive(false); // Reset filter active state on new search
                setPage(1); // Reset to first page on new search

                // now that we have the data --> we can find what brands, colors, and prices so we know what we can filter
                findBrands(data);
                findColors(data);
                findPrices(data);

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
                    <h1 style={{ paddingBottom: 20}}>Search Sneakers</h1>
                </Row>
                <Row>

                {/* This is the filter panel on the side of the screen */}
                {
                  allSneakers.length > 0 ?
                  <Col xs={12} md={3}>
                    <FilterPanel colors={colors} prices={prices} brands={brands} onFilter={handleFilter}/>
                  </Col>
                  :
                  <></>
                }
                <Col xs={12} md={9}>

                {/* Search form */}
                <form onSubmit={handleSearch} style={{ marginBottom: 30, width: "100%" }}>
                  <Form.Group className="d-flex align-items-center">
                  <Form.Label htmlFor="search-input" className="me-3 mb-0" style={{ fontWeight: 500 }}>
                    Search Sneakers
                  </Form.Label>
                  <Form.Control
                    id="search-input"
                    type="text"
                    placeholder="Search by brand, model, etc."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 250, marginRight: 8 }}
                  />
                  <Button type="submit" variant="primary">Search</Button>
                  </Form.Group>
                </form>

                
                {loading && <h2 style = {{paddingLeft: 150}}>Loading Sneakers from Our Vault 🔒...</h2>}

                {!loading && !error && (
                  <>
                    {filtersActive && filtered.length === 0 ? (
                      <div style={{ padding: "40px", textAlign: "center" }}>
                        <h4>No shoes match your filters</h4>
                        <p className="text-muted">Try adjusting your filter criteria</p>
                      </div>
                ) : (
                  <Row className="g-3">
                    {display.map((shoe, index) => (
                      <Col key={shoe.styleID || shoe.shoeName} xs={12} sm={6} md={4} lg={3}>
                        <ShoeCard
                          styleID={shoe.styleID}
                          brand={shoe.brand}
                          shoeName={shoe.shoeName}
                          colorway={shoe.colorway}
                          thumbnail={shoe.thumbnail}
                          retailPrice={shoe.retailPrice}
                          silhoutte={shoe.silhoutte}
                          id={shoe._id}
                          index={index}
                        />
                      </Col>
                      ))}
                  </Row>
                )}
              </>
              )}
              </Col>
            </Row>

            {/* Bottom Screen Pagination */}
            {
              dataToPaginate.length > 0 && totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    {/* Previous button */}
                    <Pagination.Prev 
                      disabled={page === 1}
                      onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    />

                    {/* Actual pagination button */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Pagination.Item
                        key={pageNum}
                        active={pageNum === page}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                    </Pagination.Item>
                    ))}

                    {/* Next button */}
                    <Pagination.Next 
                      disabled={page === totalPages}
                      onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    />
                </Pagination>
              </div>
              )}
            </Container>
        </div>
    );
}
