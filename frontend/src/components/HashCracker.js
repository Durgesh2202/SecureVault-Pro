import React, { useState } from "react";
import {
  Box, TextField, Typography, Button, MenuItem, Fade, CircularProgress, Alert
} from "@mui/material";
import axios from "axios";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SecurityIcon from "@mui/icons-material/Security";
import { getApiUrl, getAxiosConfig, API_CONFIG } from "../config";

export default function HashCracker() {
  const [hash, setHash] = useState("");
  const [type, setType] = useState("md5");
  const [maxLength, setMaxLength] = useState(4);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const crackHash = async () => {
    setLoading(true);
    setShow(false);
    setResult("");
    try {
      const res = await axios.post(
        getApiUrl(API_CONFIG.ENDPOINTS.CRACK), 
        { hash, type, maxLength },
        getAxiosConfig()
      );
      setResult(res.data.result);
    } catch (err) {
      let errorMessage = "Error analyzing hash.";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "Request timed out. Please try again.";
      } else if (err.response) {
        errorMessage = `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "Cannot connect to server. Please check your internet connection.";
      }
      
      setResult(errorMessage);
    }
    setLoading(false);
    setTimeout(() => setShow(true), 150);
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
        <VpnKeyIcon sx={{ color: "#2196f3" }} />
        Hash Analysis Tool
      </Typography>
      
      <TextField
        label="Enter hash to analyze"
        fullWidth
        margin="normal"
        value={hash}
        onChange={e => setHash(e.target.value)}
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
          }
        }}
      />
      
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 3 }}>
        <TextField
          select
          label="Hash Algorithm"
          value={type}
          onChange={e => setType(e.target.value)}
          sx={{ 
            minWidth: 200,
            flex: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fafafa",
              borderRadius: 2
            }
          }}
        >
          <MenuItem value="md5">MD5 (128-bit)</MenuItem>
          <MenuItem value="sha1">SHA-1 (160-bit)</MenuItem>
          <MenuItem value="sha224">SHA-224 (224-bit)</MenuItem>
          <MenuItem value="sha256">SHA-256 (256-bit)</MenuItem>
          <MenuItem value="sha384">SHA-384 (384-bit)</MenuItem>
          <MenuItem value="sha512">SHA-512 (512-bit)</MenuItem>
          <MenuItem value="sha3_224">SHA3-224 (224-bit)</MenuItem>
          <MenuItem value="sha3_256">SHA3-256 (256-bit)</MenuItem>
          <MenuItem value="sha3_384">SHA3-384 (384-bit)</MenuItem>
          <MenuItem value="sha3_512">SHA3-512 (512-bit)</MenuItem>
          <MenuItem value="blake2b">BLAKE2b (512-bit)</MenuItem>
          <MenuItem value="blake2s">BLAKE2s (256-bit)</MenuItem>
        </TextField>
        <TextField
          label="Max Password Length"
          type="number"
          value={maxLength}
          onChange={e => setMaxLength(Number(e.target.value))}
          inputProps={{ min: 1, max: 8 }}
          sx={{ 
            maxWidth: { xs: "100%", sm: 180 },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fafafa",
              borderRadius: 2
            }
          }}
        />
      </Box>
      
      <Button
        variant="contained"
        sx={{
          bgcolor: "#2196f3",
          color: "#fff",
          fontWeight: 600,
          borderRadius: 2,
          width: "100%",
          py: 1.5,
          fontSize: "1rem",
          textTransform: "none",
          "&:hover": { 
            bgcolor: "#1976d2",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)"
          },
          transition: "all 0.2s ease"
        }}
        onClick={crackHash}
        disabled={loading}
        startIcon={<SecurityIcon />}
      >
        Analyze Hash
      </Button>
      
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      
      <Fade in={show}>
        <Box sx={{ mt: 3 }}>
          {result && (
            <Alert 
              severity={result.startsWith("Not") || result.includes("Error") ? "error" : "success"}
              sx={{ 
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: 500
              }}
            >
              {result}
            </Alert>
          )}
        </Box>
      </Fade>
      
      <Alert 
        severity="warning" 
        sx={{ 
          mt: 3, 
          borderRadius: 2,
          backgroundColor: "rgba(255, 193, 7, 0.1)",
          border: "1px solid rgba(255, 193, 7, 0.3)"
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Educational Purpose Only: This tool is designed for learning about hash security. 
          Do not use for unauthorized access to systems or data.
        </Typography>
      </Alert>
    </Box>
  );
}