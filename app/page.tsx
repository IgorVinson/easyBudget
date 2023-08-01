import styles from './page.module.css'
import {Button} from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello guys!</h1>
      <Button variant="contained">Click me</Button>
    </main>
  )
}
