import React, { useState } from "react";
import {
  Box, TextField, Typography, Button, MenuItem, Fade, Alert, Tabs, Tab
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import TransformIcon from "@mui/icons-material/Transform";

export default function EncodingDecoding() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [encodingType, setEncodingType] = useState("base64");
  const [operation, setOperation] = useState("encode");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const processText = () => {
    setShow(false);
    setError("");
    setOutputText("");
    
    try {
      let result = "";
      
      if (operation === "encode") {
        switch (encodingType) {
          case "base64":
            result = btoa(inputText);
            break;
          case "url":
            result = encodeURIComponent(inputText);
            break;
          case "html":
            result = inputText
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;");
            break;
          case "hex":
            result = Array.from(inputText)
              .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
              .join('');
            break;
          case "binary":
            result = Array.from(inputText)
              .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
              .join(' ');
            break;
          case "ascii":
            result = Array.from(inputText)
              .map(char => char.charCodeAt(0))
              .join(' ');
            break;
          case "unicode":
            result = Array.from(inputText)
              .map(char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`)
              .join('');
            break;
          default:
            throw new Error("Unsupported encoding type");
        }
      } else {
        switch (encodingType) {
          case "base64":
            result = atob(inputText);
            break;
          case "url":
            result = decodeURIComponent(inputText);
            break;
          case "html":
            result = inputText
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/&amp;/g, "&");
            break;
          case "hex":
            const hexPairs = inputText.match(/.{1,2}/g) || [];
            result = hexPairs.map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
            break;
          case "binary":
            const binaryGroups = inputText.split(' ');
            result = binaryGroups.map(binary => String.fromCharCode(parseInt(binary, 2))).join('');
            break;
          case "ascii":
            const asciiValues = inputText.split(' ');
            result = asciiValues.map(ascii => String.fromCharCode(parseInt(ascii))).join('');
            break;
          case "unicode":
            result = inputText.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => 
              String.fromCharCode(parseInt(hex, 16))
            );
            break;
          default:
            throw new Error("Unsupported encoding type");
        }
      }
      
      setOutputText(result);
      setTimeout(() => setShow(true), 200);
    } catch (e) {
      setError(`Error: ${e.message}. Please check your input format.`);
      setTimeout(() => setShow(true), 200);
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
        <CodeIcon sx={{ color: "#2196f3" }} />
        Text Encoding & Decoding
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
          <Tab label="Encode" value="encode" />
          <Tab label="Decode" value="decode" />
        </Tabs>

        <TextField
          select
          label="Encoding Type"
          value={encodingType}
          onChange={e => setEncodingType(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fafafa",
              borderRadius: 2
            }
          }}
        >
          <MenuItem value="base64">Base64</MenuItem>
          <MenuItem value="url">URL Encoding</MenuItem>
          <MenuItem value="html">HTML Entities</MenuItem>
          <MenuItem value="hex">Hexadecimal</MenuItem>
          <MenuItem value="binary">Binary</MenuItem>
          <MenuItem value="ascii">ASCII Values</MenuItem>
          <MenuItem value="unicode">Unicode Escape</MenuItem>
        </TextField>

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
          startIcon={<TransformIcon />}
        >
          {operation === "encode" ? "Encode Text" : "Decode Text"}
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
                label={`${operation === "encode" ? "Encoded" : "Decoded"} Result`}
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
    </Box>
  );
}
