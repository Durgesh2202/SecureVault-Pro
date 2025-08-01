import React from "react";
import { Container, Tabs, Tab, Box, Paper } from "@mui/material";
import CrazyHeader from "./components/CrazyHeader";
import PasswordStrengthChecker from "./components/PasswordStrengthChecker";
import HashCracker from "./components/HashCracker";
import EducationTips from "./components/EducationTips";
import EncodingDecoding from "./components/EncodingDecoding";
import EncryptionDecryption from "./components/EncryptionDecryption";

export default function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <CrazyHeader />
      <Paper elevation={24} sx={{
        mt: 4,
        borderRadius: 3,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)",
        border: "1px solid rgba(255,255,255,0.3)"
      }}>
        <Box sx={{ borderBottom: 1, borderColor: "rgba(33, 150, 243, 0.2)", bgcolor: "transparent" }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              ".MuiTabs-indicator": { 
                backgroundColor: "#2196f3",
                height: 3,
                borderRadius: "3px 3px 0 0"
              },
              ".MuiTab-root": {
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.95rem",
                minWidth: "auto",
                px: 2
              }
            }}
          >
            <Tab label="Password Strength" />
            <Tab label="Hash Analysis" />
            <Tab label="Encoding/Decoding" />
            <Tab label="Encryption/Decryption" />
            <Tab label="Security Tips" />
          </Tabs>
        </Box>
        <Box sx={{ p: 4 }}>
          {tab === 0 && <PasswordStrengthChecker />}
          {tab === 1 && <HashCracker />}
          {tab === 2 && <EncodingDecoding />}
          {tab === 3 && <EncryptionDecryption />}
          {tab === 4 && <EducationTips />}
        </Box>
      </Paper>
    </Container>
  );
}