import React from "react";
import styles from "./Carroussel.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ICarroussel } from "../../Interfaces/Interfaces";

const Carroussel = ({ images }: ICarroussel) => {
  const [current, setCurrent] = React.useState(0);
  const total = images?.length - 1;

  const prevImage = () => {
    current === 0 ? setCurrent(total) : setCurrent(current - 1);
  };

  const nextImage = () => {
    current === total ? setCurrent(0) : setCurrent(current + 1);
  };

  return (
    <div className={styles.carroussel}>
      <div className={styles.carroussel__images}>
        {images && <img src={images[current]} />}
        {total !== 0 && (
          <>
            <button
              onClick={prevImage}
              className={styles["carroussel__prev-button"]}
            >
              <IoIosArrowBack className={styles["carroussel__prev-button"]} />
            </button>
            <button
              onClick={nextImage}
              className={styles["carroussel__next-button"]}
            >
              <IoIosArrowForward className={styles["carroussel__prev-button"]} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Carroussel;
