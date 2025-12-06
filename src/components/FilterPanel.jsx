import { useState } from "react";
import { Card, Form, Button, Accordion } from "react-bootstrap";
import "./FilterPanel.css";

function FilterPanel(props) {
  const { brands = [], colors = [], prices = [], onFilter } = props;
  
  // Get min and max prices from the prices array
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;

  // State to track selected filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Build filters object
  const buildFilters = () => {
    return {
      brands: selectedBrands,
      colors: selectedColors,
      minPrice: minPriceFilter ? Number(minPriceFilter) : null,
      maxPrice: maxPriceFilter ? Number(maxPriceFilter) : null,
      sort: sortOption
    };
  };

  // Handle brand checkbox change
  const handleBrandChange = (brand, isChecked) => {
    if (isChecked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  // Handle color checkbox change
  const handleColorChange = (color, isChecked) => {
    if (isChecked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    const filters = buildFilters();
    if (onFilter) {
      onFilter(filters);
    }
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setMinPriceFilter("");
    setMaxPriceFilter("");
    setSortOption("");
    if (onFilter) {
      onFilter({
        brands: [],
        colors: [],
        minPrice: null,
        maxPrice: null,
        sort: ""
      });
    }
  };

  return (
    <Card className="filter-panel">
      <Card.Header>
        <h5 className="mb-0">Filters</h5>
      </Card.Header>
      <Card.Body>
        <Accordion defaultActiveKey="0" flush>
          {/* Brand Filter */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Brand</Accordion.Header>
            <Accordion.Body>
              <Form>
                {brands.length > 0 ? (
                  brands.map((brand, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      id={`brand-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                      label={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => handleBrandChange(brand, e.target.checked)}
                    />
                  ))
                ) : (
                  <p className="text-muted small">No brands available</p>
                )}
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          {/* Color Filter */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Color</Accordion.Header>
            <Accordion.Body>
              <Form>
                {colors.length > 0 ? (
                  colors.map((color, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      id={`color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                      label={color.charAt(0).toUpperCase() + color.slice(1)}
                      checked={selectedColors.includes(color)}
                      onChange={(e) => handleColorChange(color, e.target.checked)}
                    />
                  ))
                ) : (
                  <p className="text-muted small">No colors available</p>
                )}
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          {/* Price Range Filter */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>Price Range</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Min Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={minPrice.toString()}
                    min="0"
                    value={minPriceFilter}
                    onChange={(e) => setMinPriceFilter(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Max Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={maxPrice.toString()}
                    min="0"
                    value={maxPriceFilter}
                    onChange={(e) => setMaxPriceFilter(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          {/* Sort Options */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>Sort By</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Check
                  type="radio"
                  name="sort"
                  id="sort-price-low"
                  label="Price: Low to High"
                  checked={sortOption === "price-low"}
                  onChange={() => setSortOption("price-low")}
                />
                <Form.Check
                  type="radio"
                  name="sort"
                  id="sort-price-high"
                  label="Price: High to Low"
                  checked={sortOption === "price-high"}
                  onChange={() => setSortOption("price-high")}
                />
                <Form.Check
                  type="radio"
                  name="sort"
                  id="sort-name-asc"
                  label="Name: A to Z"
                  checked={sortOption === "name-asc"}
                  onChange={() => setSortOption("name-asc")}
                />
                <Form.Check
                  type="radio"
                  name="sort"
                  id="sort-name-desc"
                  label="Name: Z to A"
                  checked={sortOption === "name-desc"}
                  onChange={() => setSortOption("name-desc")}
                />
                <Form.Check
                  type="radio"
                  name="sort"
                  id="sort-brand"
                  label="Brand"
                  checked={sortOption === "brand"}
                  onChange={() => setSortOption("brand")}
                />
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="filter-actions mt-3">
          <Button variant="primary" className="w-100 mb-2" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline-secondary" className="w-100" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FilterPanel;

