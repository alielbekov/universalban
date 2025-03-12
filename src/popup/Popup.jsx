import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const platforms = [
  { id: 'reddit', label: 'Reddit' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
];

const Popup = () => {
  const [currentPlatform, setCurrentPlatform] = useState('reddit');
  const [blockInput, setBlockInput] = useState('');
  const [blockedTerms, setBlockedTerms] = useState([]);

  useEffect(() => {
    loadBlockList();
  }, [currentPlatform]);

  const loadBlockList = () => {
    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      setBlockedTerms(platformBlocks[currentPlatform] || []);
    });
  };

  const handlePlatformChange = (event, newPlatform) => {
    if (newPlatform !== null) {
      setCurrentPlatform(newPlatform);
    }
  };

  const addNewBlock = () => {
    const term = blockInput.trim();
    if (!term) return;

    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      platformBlocks[currentPlatform] = platformBlocks[currentPlatform] || [];
      
      if (!platformBlocks[currentPlatform].includes(term)) {
        platformBlocks[currentPlatform].push(term);
        chrome.storage.sync.set({ platformBlocks }, () => {
          setBlockInput('');
          loadBlockList();
          notifyContentScript(platformBlocks[currentPlatform]);
        });
      }
    });
  };

  const removeBlock = (term) => {
    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      platformBlocks[currentPlatform] = (platformBlocks[currentPlatform] || [])
        .filter(t => t !== term);
      
      chrome.storage.sync.set({ platformBlocks }, () => {
        loadBlockList();
        notifyContentScript(platformBlocks[currentPlatform]);
      });
    });
  };

  const notifyContentScript = (blockedTerms) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'updateBlocks',
          platform: currentPlatform,
          blockedTerms: blockedTerms
        });
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addNewBlock();
    }
  };

  return (
    <Box sx={{ width: 320, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        UniversalBan
      </Typography>
      
      <Paper sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={currentPlatform}
          exclusive
          onChange={handlePlatformChange}
          aria-label="platform selection"
          size="small"
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            p: 1,
            gap: 0.5,
            '& .MuiToggleButton-root': {
              border: '1px solid #e0e0e0',
              borderRadius: '20px !important',
              px: 2
            }
          }}
        >
          {platforms.map((platform) => (
            <ToggleButton 
              key={platform.id} 
              value={platform.id}
              aria-label={platform.label}
            >
              {platform.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          fullWidth
          value={blockInput}
          onChange={(e) => setBlockInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter name or term to block"
        />
        <Button 
          variant="contained" 
          onClick={addNewBlock}
          disabled={!blockInput.trim()}
        >
          Add
        </Button>
      </Box>

      <List sx={{ 
        maxHeight: 300, 
        overflow: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 1
      }}>
        {blockedTerms.map((term, index) => (
          <ListItem 
            key={index}
            sx={{
              bgcolor: '#f5f5f5',
              mb: 0.5,
              borderRadius: 1
            }}
          >
            <ListItemText primary={term} />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                aria-label="delete"
                onClick={() => removeBlock(term)}
                size="small"
                sx={{ color: '#ff1744' }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Popup;
