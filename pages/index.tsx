import { SearchBox } from "components/SearchBox";
import styles from "styles/Home.module.css";

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>Welcome to Zeek Package Browser!</h1>

      <div className={styles.description}>
        Get started by searching:{" "}
        <SearchBox placeholder="Search for packages" autoFocus />
      </div>
    </>
  );
}
