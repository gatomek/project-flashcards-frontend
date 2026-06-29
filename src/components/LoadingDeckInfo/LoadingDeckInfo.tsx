import styles from './LoadingDeckInfo.module.css';
import { RotateLoader } from "react-spinners";
import type {CSSProperties} from "react";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export function LoadingDeckInfo() {
    return (
        <div className={styles.root}>
            <RotateLoader
                color={"gray"}
                cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}