"use client";
import Image from "next/image";
import styles from "@/styles/loadingball.module.css";

const LoadingBall = () => {
  return (
    <div className={styles.main}>
      <div className={styles.ballContainer}>
        <Image
          src="https://ik.imagekit.io/deveoper99/ball-football-icon.svg"
          alt="football-icon"
          width={40}
          height={40}
          className={styles.ball}
        />
        <Image
          src="https://ik.imagekit.io/deveoper99/ball-football-icon.svg"
          alt="football-icon"
          width={40}
          height={40}
          className={styles.ball}
        />
        <Image
          src="https://ik.imagekit.io/deveoper99/ball-football-icon.svg"
          alt="football-icon"
          width={40}
          height={40}
          className={styles.ball}
        />
      </div>
    </div>
  );
};

export default LoadingBall;
