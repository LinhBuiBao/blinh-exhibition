import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import "./App.css";

import video1 from "./assests/videos/video1.mp4";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context("./assests/exhibitions", false, /\.(png|jpe?g|svg)$/)
);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Modal.setAppElement('#yourAppElement');

const App = (props) => {
  const { theme } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2700);

    return () => clearTimeout(timer);
  }, []); // Chạy chỉ một lần sau khi component được mount

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function openModal(index) {
    setCurrentIndex(index);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const scaleValue = 1 + scrollY / 40000; // Điều chỉnh giá trị 500 theo nhu cầu
  const translateYValue = scrollY / 3; // Điều chỉnh giá trị 3 theo nhu cầu

  return isLoading ? (
    <div className="exhibition-container-loading">
      <div className="content">
        <h1 className="blinh">blinh</h1>
      </div>
    </div>
  ) : (
    <>
      <div className="hero">
        <section className="hero__content">
          <div className="hero__text">
            <h1 className="centered animated fadeInUp slow">
              {" "}
              Capturing Moments, Creating Memories
            </h1>
            <p className="hero__subtitle centered animated fadeInUp slow delay-1s">
              Explore the quiet charm of life's simple moments through my lens.{" "}
              <br />
              Each photo, a humble celebration of the beauty found in the
              everyday
            </p>
          </div>
        </section>
      </div>

      <div className="projects-main">
        <div className="line-container">
          <h3 className="title fadeInUp">Exhibitions</h3>

          <div className="line"></div>
        </div>

        <div className="video-container">
          <p className="subtitle subtitle-video">Some short videos I've done</p>
          <div className="wrap-video video1">
            <iframe
              className="video"
              src="https://drive.google.com/file/d/16s2J-DXfmJo-LQP1VDq-OCsIXjmOcgWh/preview"
              width="640"
              height="480"
              allow="fullscreen"
            ></iframe>
            <div>
              <p>Fanmade Music Video (FMV) - GUMMY BEAR - TÙNG</p>
            </div>
          </div>

          <div className="wrap-video video2">
            <iframe
              className="video"
              src="https://drive.google.com/file/d/1nPo-_9tUmLjoMtq2uZ1DEW6cHy3CVaWh/preview"
              allow="fullscreen"
              width="640"
              height="480"
            ></iframe>

            <div>
              <p>
                Fanmade Music Video (FMV) - Đố em đi tìm - The Red Team x Khuê
              </p>
            </div>
          </div>
        </div>

        <div className="photos-container">
          <p className="subtitle subtitle2">Welcome to my photos exhibitions</p>
          <section className="gallery-box">
            <div className="images">
              {images.map((image, index) => {
                return (
                  <div
                    className="frame-exhibition"
                    onClick={() => openModal(index)}
                  >
                    <div className="border-frame-exhibition">
                      <img
                        className="img-exhibition"
                        alt="background"
                        src={image}
                        style={{ transform: `scale(${scaleValue})` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-content">
            <p onClick={closeModal} className="close-btn">
              CLOSE
            </p>

            <img
              className="img-modal"
              alt="background"
              src={images[currentIndex]}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default App;
