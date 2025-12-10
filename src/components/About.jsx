export default function About(props) {
    return <div >
        <h1>What is Sneaker Vault?</h1><br/>

        <div style={{ textAlign: 'left'}}>
            <h2>Your Hub for Sneaker Discovery</h2>
            <p>
                Sneaker Vault is designed to help users explore a wide variety of sneakers 
                in a clean, user-friendly interface without the distraction of ads. 
                Our goal is to make it easy to compare options, discover new styles,
                and quickly find the pair that fits your needs.
            </p><br/>

            <h2>Trending Products</h2>

            <p>
                In our Trending Products page, you can find the most hip and up-to-date foot and streetwear.
            </p><br />

            <h2>Smart Filtering & Search</h2>

            <p>
                In our All Sneakers page, the primary way to begin finding sneakers is through the search bar. 
                As users type, we will perform primary filtering on the results.
            </p>
            <p>
                Additional filters will appear on the left quarter of the screen to help 
                narrow down results even further.
            </p>

            <strong>Filter Options</strong>
            <ul>
                <li><strong>Brand:</strong> selected with checkboxes</li>
                <li><strong>Color &amp; Gender:</strong> selected with checkboxes</li>
                <li><strong>Price Range:</strong> inputted with a minimum and maximum price range</li>
                <li><strong>Sorting:</strong> a checkbox system that enables sorting by price, name, and brand</li>
            </ul>

            <h2>The <em style={{ color: 'purple' }}>Magic</em> Behind The Scenes</h2>
            <p>
                We fetch data from a sneaker API. Each shoe is represented as its own 
                sneaker card, including an image, the brand/model, and price of the shoe.
            </p>
            <p>
                Sneaker Vault is built using <em>React</em>, allowing us to create dynamic, 
                responsive components and update sneaker listings in real time as users 
                search and filter.
            </p>

        </div>
    </div>
}