import React, { useState } from "react";
import {
  Box, TextField, Typography, LinearProgress, Button, Fade, Chip, Alert
} from "@mui/material";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import LockIcon from "@mui/icons-material/Lock";
import { getApiUrl, getAxiosConfig, API_CONFIG } from "../config";

const COLORS = [
  "#f44336", // Very Weak
  "#ff9800", // Weak
  "#ffeb3b", // Fair
  "#4caf50", // Good
  "#2196f3", // Strong
  "#00e676"  // Excellent
];

const ICONS = [
  <ErrorIcon />,
  <WarningIcon />,
  <WarningIcon />,
  <CheckCircleIcon />,
  <CheckCircleIcon />,
  <LockIcon />
];

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const checkStrength = async () => {
    setShow(false);
    setError("");
    if (!password) return;
    
    try {
      const res = await axios.post(
        getApiUrl(API_CONFIG.ENDPOINTS.STRENGTH), 
        { password },
        getAxiosConfig()
      );
      setStrength(res.data.strength);
      setScore(res.data.score);
      setTimeout(() => setShow(true), 200);
    } catch (err) {
      let errorMessage = "Unable to analyze password strength.";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "Request timed out. Please try again.";
      } else if (err.response) {
        errorMessage = `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "Cannot connect to server. Please check your internet connection.";
      }
      
      setError(errorMessage);
      setTimeout(() => setShow(true), 200);
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "#1a237e",
          mb: 3,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1
        }}
      >
        <LockIcon sx={{ color: "#2196f3" }} />
        Password Security Analysis
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Enter password to analyze"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") checkStrength(); }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fafafa",
              borderRadius: 2,
              "& fieldset": {
                borderColor: "#e0e0e0"
              },
              "&:hover fieldset": {
                borderColor: "#2196f3"
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2196f3"
              }
            },
            "& .MuiInputLabel-root": {
              color: "#666"
            }
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#2196f3",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 2,
            py: 1.5,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": { 
              bgcolor: "#1976d2",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)"
            },
            transition: "all 0.2s ease"
          }}
          onClick={checkStrength}
        >
          Analyze Password Strength
        </Button>
      </Box>

      <Fade in={show}>
        <Box>
          {error ? (
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: 2,
                mb: 2
              }}
            >
              {error}
            </Alert>
          ) : (
            <>
              <LinearProgress
                variant="determinate"
                value={(score + 1) * 16.67}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  mb: 2,
                  background: "#f0f0f0",
                  "& .MuiLinearProgress-bar": {
                    background: `linear-gradient(90deg, ${COLORS[score]}, ${COLORS[score]}dd)`,
                    borderRadius: 6,
                    transition: "all 0.4s ease"
                  }
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
                <Chip
                  icon={ICONS[score]}
                  label={strength}
                  sx={{
                    backgroundColor: COLORS[score],
                    color: score < 2 ? "#fff" : "#000",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 1
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Box>
  );
}