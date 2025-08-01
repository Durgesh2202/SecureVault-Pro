import React, { useState } from "react";
import {
  Box, TextField, Typography, Button, MenuItem, Fade, Alert, Tabs, Tab
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";

export default function EncryptionDecryption() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("caesar");
  const [operation, setOperation] = useState("encrypt");
  const [shift, setShift] = useState(3);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const processText = async () => {
    setShow(false);
    setError("");
    setOutputText("");
    setLoading(true);

    try {
      if (algorithm === "caesar") {
        // Client-side Caesar cipher
        let result = "";
        const shiftValue = operation === "encrypt" ? shift : -shift;
        
        for (let char of inputText) {
          if (char.match(/[a-zA-Z]/)) {
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toLowerCase().charCodeAt(0);
            const shifted = ((charCode - 97 + shiftValue + 26) % 26) + 97;
            const shiftedChar = String.fromCharCode(shifted);
            result += isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
          } else {
            result += char;
          }
        }
        setOutputText(result);
      } else {
        // Server-side encryption/decryption
        const response = await axios.post("http://localhost:5000/api/crypto", {
          text: inputText,
          key: key,
          algorithm: algorithm,
          operation: operation
        });
        setOutputText(response.data.result);
      }
      
      setTimeout(() => setShow(true), 200);
    } catch (e) {
      setError(`Error: ${e.response?.data?.error || e.message}`);
      setTimeout(() => setShow(true), 200);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
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
        Text Encryption & Decryption
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs
          value={operation}
          onChange={(_, value) => setOperation(value)}
          centered
          sx={{
            mb: 2,
            "& .MuiTabs-indicator": {
              backgroundColor: "#2196f3"
            }
          }}
        >
          <Tab label="Encrypt" value="encrypt" />
          <Tab label="Decrypt" value="decrypt" />
        </Tabs>

        <TextField
          select
          label="Encryption Algorithm"
          value={algorithm}
          onChange={e => setAlgorithm(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fafafa",
              borderRadius: 2
            }
          }}
        >
          <MenuItem value="caesar">Caesar Cipher</MenuItem>
          <MenuItem value="vigenere">Vigenère Cipher</MenuItem>
          <MenuItem value="base64">Base64 (Encoding)</MenuItem>
          <MenuItem value="rot13">ROT13</MenuItem>
        </TextField>

        {algorithm === "caesar" && (
          <TextField
            label="Shift Value"
            type="number"
            value={shift}
            onChange={e => setShift(parseInt(e.target.value) || 0)}
            inputProps={{ min: 1, max: 25 }}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fafafa",
                borderRadius: 2
              }
            }}
          />
        )}

        {(algorithm === "vigenere") && (
          <TextField
            label="Encryption Key"
            value={key}
            onChange={e => setKey(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fafafa",
                borderRadius: 2
              }
            }}
            helperText="Enter a key for Vigenère cipher"
          />
        )}

        <TextField
          label={`Text to ${operation}`}
          multiline
          rows={4}
          fullWidth
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fafafa",
              borderRadius: 2
            }
          }}
        />

        <Button
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            bgcolor: "#2196f3",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 2,
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
          onClick={processText}
          startIcon={operation === "encrypt" ? <LockIcon /> : <LockOpenIcon />}
        >
          {loading ? "Processing..." : (operation === "encrypt" ? "Encrypt Text" : "Decrypt Text")}
        </Button>
      </Box>

      <Fade in={show}>
        <Box>
          {error ? (
            <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>
              {error}
            </Alert>
          ) : outputText ? (
            <Box>
              <TextField
                label={`${operation === "encrypt" ? "Encrypted" : "Decrypted"} Result`}
                multiline
                rows={4}
                fullWidth
                value={outputText}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f0f8ff",
                    borderRadius: 2
                  }
                }}
              />
              <Button
                variant="outlined"
                onClick={copyToClipboard}
                sx={{
                  borderColor: "#2196f3",
                  color: "#2196f3",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.1)"
                  }
                }}
              >
                Copy to Clipboard
              </Button>
            </Box>
          ) : null}
        </Box>
      </Fade>

      <Alert 
        severity="info" 
        sx={{ 
          mt: 3, 
          borderRadius: 2,
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          border: "1px solid rgba(33, 150, 243, 0.3)"
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Educational Purpose: These are classical ciphers for learning. 
          For real security, use modern encryption standards like AES.
        </Typography>
      </Alert>
    </Box>
  );
}
