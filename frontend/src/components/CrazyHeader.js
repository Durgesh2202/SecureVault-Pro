import React from "react";
import { Typography, Box } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import ShieldIcon from "@mui/icons-material/Shield";

export default function CrazyHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: "center",
        pt: 4,
        pb: 1,
        userSelect: "none"
      }}
    >
      <SecurityIcon sx={{
        fontSize: 48,
        color: "#00e676",
        filter: "drop-shadow(0 0 10px rgba(0, 230, 118, 0.3))"
      }} />
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          letterSpacing: 1,
          background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)"
        }}
      >
        SecureVault Pro
      </Typography>
      <ShieldIcon sx={{
        fontSize: 48,
        color: "#2196f3",
        filter: "drop-shadow(0 0 10px rgba(33, 150, 243, 0.3))"
      }} />
    </Box>
  );
}