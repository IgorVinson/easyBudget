import Button from "@mui/material/Button";
import {Container} from "@mui/material";

export default function Home() {
    return (
        <>
            <main>
                <h1>Hello guys!</h1>
                <Container>
                    <Button variant="contained">Click me</Button>
                    <Button variant="contained" color={"secondary"}>Click me</Button>
                </Container>
            </main>
        </>

    )
}
