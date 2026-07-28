import { useRef, useState } from "react";
import "./styles/scanid.css";
import scanHeroImage from "../../assets/scan-id-hero.png";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

type StepId = 1 | 2;

const STEPS: { id: StepId; label: string }[] = [
  { id: 1, label: "Front of ID" },
  { id: 2, label: "Back of ID" },
];

export default function ScanId() {
  const [activeStep, setActiveStep] = useState<StepId>(1);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (activeStep === 1) {
        setFrontImage(dataUrl);
        setActiveStep(2);
      } else {
        setBackImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const currentImage = activeStep === 1 ? frontImage : backImage;
  const currentLabel = STEPS.find((s) => s.id === activeStep)?.label ?? "";

  return (
    <div className="scanid-page">
      <header className="scanid-navbar">
        <h2 className="scanid-brand">Gestion Events</h2>
        <button type="button" className="scanid-cancel">
          <CloseOutlinedIcon fontSize="small" />
          <span>Cancel</span>
        </button>
      </header>

      <main className="scanid-body">
        <div className="scanid-left">
          <div>
            <h1 className="scanid-title">Identity Verification</h1>
            <p className="scanid-description">
              Please scan your identity document to validate your organizer
              profile and ensure the security of your future events.
            </p>
          </div>

          <ol className="scanid-steps">
            {STEPS.map((step) => {
              const image = step.id === 1 ? frontImage : backImage;
              const captured = Boolean(image);
              const isActive = step.id === activeStep;
              const status = captured
                ? "Captured"
                : isActive
                ? "Capturing..."
                : "Pending";

              return (
                <li
                  key={step.id}
                  className={`scanid-step${
                    isActive ? " scanid-step--active" : ""
                  }${!isActive && !captured ? " scanid-step--pending" : ""}`}
                >
                  <button
                    type="button"
                    className="scanid-step-btn"
                    onClick={() => setActiveStep(step.id)}
                  >
                    <span className="scanid-step-left">
                      <span
                        className={`scanid-step-badge ${
                          captured
                            ? "scanid-step-badge--done"
                            : isActive
                            ? "scanid-step-badge--active"
                            : "scanid-step-badge--pending"
                        }`}
                      >
                        {captured ? <CheckIcon fontSize="inherit" /> : step.id}
                      </span>
                      <span>
                        <p className="scanid-step-name">{step.label}</p>
                        <p className="scanid-step-status">{status}</p>
                      </span>
                    </span>
                    {isActive && !captured && (
                      <RadioButtonCheckedIcon className="scanid-step-radio" />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="scanid-trust">
            <div className="scanid-trust-item">
              <GppGoodOutlinedIcon />
              <span>End-to-end encrypted data</span>
            </div>
            <div className="scanid-trust-item">
              <GppGoodOutlinedIcon />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>

        <div className="scanid-right">
          <div className="scanid-camera-card">
            <div className="scanid-camera-view">
              {currentImage ? (
                <img
                  key={`captured-${activeStep}`}
                  src={currentImage}
                  alt={`${currentLabel} preview`}
                  className="scanid-camera-photo"
                />
              ) : activeStep === 1 ? (
                <img
                  key="demo"
                  src={scanHeroImage}
                  alt="Identity document being aligned for scanning"
                  className="scanid-camera-photo"
                />
              ) : (
                <div key="empty" className="scanid-camera-empty">
                  <BadgeOutlinedIcon />
                  <p>Position the back of your ID inside the frame</p>
                </div>
              )}

              <span className="scanid-corner scanid-corner--tl" />
              <span className="scanid-corner scanid-corner--tr" />
              <span className="scanid-corner scanid-corner--bl" />
              <span className="scanid-corner scanid-corner--br" />

              {currentImage ? (
                <div className="scanid-alignment-pill scanid-alignment-pill--success">
                  <CheckCircleIcon fontSize="inherit" />
                  <span>{currentLabel} captured</span>
                </div>
              ) : activeStep === 1 ? (
                <div className="scanid-alignment-pill">
                  <span className="scanid-alignment-dot" />
                  <span>Alignment detected...</span>
                </div>
              ) : null}
            </div>

            <div className="scanid-capture-bar">
              <div className="scanid-capture-left">
                <span className="scanid-capture-icon">
                  <CameraAltOutlinedIcon fontSize="small" />
                </span>
                <div>
                  <p className="scanid-capture-title">Auto-capture</p>
                  <p className="scanid-capture-subtitle">
                    Place your card inside the frame
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="scanid-upload"
                onClick={handleUploadClick}
              >
                <UploadFileOutlinedIcon fontSize="small" />
                <span>Upload a file</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="scanid-file-input"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
