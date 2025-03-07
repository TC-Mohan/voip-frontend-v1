// import { Modal, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import imageCompression from "browser-image-compression";

import "react-image-crop/dist/ReactCrop.css";
import { Button, Modal, Spinner } from "react-bootstrap";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const imageOptions = {
  maxSizeMB: 5,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

const UploadImageModal = ({
  isModalOpen,
  setIsModalOpen,
  thumbnail,
  setFinalThumbnail,
}) => {
  const [uploadFile, setUploadFile] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [aspect, setAspect] = useState(16 / 9);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setUploadFile(thumbnail);
    onSelectFile(thumbnail);
  }, [thumbnail]);

  function onSelectFile(file) {
    if (file) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    setLoading(true);
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
      name: uploadFile?.name,
    });

    // // console.log("blob", blob);

    const compressedFile = await imageCompression(blob, imageOptions);
    // // console.log("compressed file", compressedFile);

    // const blobWithProperties = new BlobWithProperties(compressedFile, {});

    setFinalThumbnail((prev) => [...prev, compressedFile]);
    setImgSrc(null);
    setUploadFile(null);
    setCrop(null);
    setCompletedCrop(null);
    setLoading(false);
    setIsModalOpen(false);
  }
  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      // We use canvasPreview as it's much faster than imgPreview.
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        rotate
      );
    }
  }, [completedCrop, scale, rotate]);

  const handleModalClose = () => {
    setImgSrc(null);
    setUploadFile(null);
    setCrop(null);
    setCompletedCrop(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        size="sm"
        backdrop="static"
        show={isModalOpen}
        onHide={() => {
          handleModalClose();
        }}
      >
        <Modal.Header>
          <Modal.Title className="fs-6">Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="info" />
              </div>
            ) : (
              <div>
                <div className="mt-3">
                  {!!imgSrc && (
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      //   aspect={aspect}
                      minWidth={50}
                      minHeight={50}
                    >
                      <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transform: `scale(${scale}) rotate(${rotate}deg)`,
                        }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}
                </div>
                <div className="mt-3 d-none">
                  {!!completedCrop && (
                    <div>
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          border: "1px solid black",
                          objectFit: "contain",
                          width: completedCrop.width,
                          height: completedCrop.height,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={loading}
            variant="secondary"
            onClick={() => handleModalClose()}
          >
            Close
          </Button>
          <Button
            disabled={loading}
            variant="primary"
            onClick={() => onDownloadCropClick()}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadImageModal;
