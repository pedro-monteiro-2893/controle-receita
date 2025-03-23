import { Carousel } from "react-bootstrap";
import img1 from '../../assets/landingPage/Finance Illustrations 1.png';
import img2 from '../../assets/landingPage/Finance Illustrations 2.png';
import img3 from '../../assets/landingPage/Finance Illustrations 3.png';
import img4 from '../../assets/landingPage/Finance Illustrations 4.png';
import img5 from '../../assets/landingPage/Finance Illustrations 5.png';
import img6 from '../../assets/landingPage/Finance Illustrations 6.png';
import img7 from '../../assets/landingPage/Finance Illustrations 7.png';
import img8 from '../../assets/landingPage/Finance Illustrations 8.png';

const Carrossel = () => {
    
  const imagens = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <Carousel interval={3000} controls={false} indicators={true} fade>
      {imagens.map((src, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={src} alt={`Ilustração ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Carrossel;
