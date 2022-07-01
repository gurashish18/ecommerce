import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Slider.css";

function Slider() {
  return (
    <div style={{ backgroundColor: "#000000" }}>
      <Carousel showArrows={true} showThumbs={false} showStatus={false}>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/1999/heros/cepc/eng/1999_GW_tallhero_3000x1200._CB633803402_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/MC/Hero/MC_DesktopTallHero_3000x1200._CB635398307_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/WLA/unrec/D39822856_WLA_BAU_GW-Unrec-heroes_DesktopTallHero_3000x1200_p._CB623159886_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/1999/heros/cepc/eng/1999_GW_tallhero_3000x1200._CB633803402_.jpg" />
        </div>
        <div>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/MC/Hero/MC_DesktopTallHero_3000x1200._CB635398307_.jpg" />
        </div>
      </Carousel>
    </div>
  );
}

export default Slider;
