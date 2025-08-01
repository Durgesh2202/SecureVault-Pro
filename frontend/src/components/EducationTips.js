import React from "react";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";

export default function EducationTips() {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          color: "#1a237e",
          fontWeight: 600,
          mb: 3,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1
        }}
      >
        <SchoolIcon sx={{ color: "#2196f3" }} />
        Security Best Practices
      </Typography>
      
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: "#f8f9fa", 
          borderRadius: 2, 
          p: 3,
          border: "1px solid #e0e0e0"
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#1a237e",
            fontWeight: 600,
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <SecurityIcon sx={{ color: "#00e676", fontSize: 20 }} />
          Essential Password Guidelines
        </Typography>
        
        <List sx={{ py: 0 }}>
          {[
            "Use minimum 12 characters - length provides exponential security",
            "Combine uppercase, lowercase, numbers, and special symbols",
            "Avoid dictionary words, personal information, or predictable patterns",
            "Never reuse passwords across different platforms or services",
            "Implement a reputable password manager for generation and storage",
            "Enable multi-factor authentication (MFA) wherever available",
            "Regular security audits help identify vulnerable accounts"
          ].map((tip, i) => (
            <ListItem key={i} sx={{ py: 1, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText 
                primary={tip}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#424242"
                }}
              />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography
          variant="body2"
          sx={{ 
            fontWeight: 500, 
            textAlign: "center",
            color: "#666",
            fontStyle: "italic"
          }}
        >
          This educational tool demonstrates security concepts for awareness and learning purposes only. 
          <br />
          Always respect privacy and legal boundaries in your security practices.
        </Typography>
      </Paper>
    </Box>
  );
}