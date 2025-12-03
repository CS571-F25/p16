// import { Text } from "react-bootstrap";

export default function Home(props) {
    return <div>
        <h1>Welcome to Sneaker Vault!</h1>
        <h2 style={{ color: 'red' }}><em>Your #1 Place for All Things Footwear!</em></h2><br/><br/>

        <div style={{ textAlign: 'left' }}>
            <ul>
                <li><h3>To learn more about us, navigate to our <a href="#/about">About</a> page.</h3><br/></li>
                <li><h3>Want to start browsing shoes? Visit our <a href="#/sneakers">Sneakers</a> page.</h3><br/></li>
                <li><h3>Questions? <a href="#/contact">Contact</a> us now.</h3></li>
            </ul>
            
            
            
        </div>

    </div>
}