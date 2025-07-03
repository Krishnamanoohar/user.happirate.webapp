import React from "react";
import { useEffect, useState } from "react";

const MetallicPaintOverlay = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function loadDefaultImage() {
      const response = await fetch(logo);
      const blob = await response.blob();
      const file = new File([blob], "default.png", { type: blob.type });
      const parsedData = await parseLogoImage(file);
      setImageData(parsedData?.imageData ?? null);
    }

    loadDefaultImage();
  }, []);

  return (
    <div className="metallic-paint-canvas">
      <MetallicPaintOverlay
        imageData={imageData ?? new ImageData(1, 1)}
        params={{
          edge: 2,
          patternBlur: 0.005,
          patternScale: 2,
          refraction: 0.015,
          speed: 0.3,
          liquid: 0.07,
        }}
      />
    </div>
  );
};

export default MetallicPaintOverlay;
