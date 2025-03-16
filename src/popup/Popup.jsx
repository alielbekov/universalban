import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Popup = () => {
  const [blockInput, setBlockInput] = useState('');
  const [blockedTerms, setBlockedTerms] = useState([]);

  useEffect(() => {
    loadBlockList();
  }, []);

  const loadBlockList = () => {
    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      setBlockedTerms(platformBlocks['reddit'] || []);
    });
  };

  const addNewBlock = () => {
    const term = blockInput.trim();
    if (!term) return;

    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      platformBlocks['reddit'] = platformBlocks['reddit'] || [];
      
      if (!platformBlocks['reddit'].includes(term)) {
        platformBlocks['reddit'].push(term);
        chrome.storage.sync.set({ platformBlocks }, () => {
          setBlockInput('');
          loadBlockList();
          notifyContentScript(platformBlocks['reddit']);
        });
      }
    });
  };

  const removeBlock = (term) => {
    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      platformBlocks['reddit'] = (platformBlocks['reddit'] || [])
        .filter(t => t !== term);
      
      chrome.storage.sync.set({ platformBlocks }, () => {
        loadBlockList();
        notifyContentScript(platformBlocks['reddit']);
      });
    });
  };

  const notifyContentScript = (blockedTerms) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        try {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateBlocks',
            platform: 'reddit',
            blockedTerms: blockedTerms
          }).catch(() => {
            console.debug('Content script not loaded on current page');
          });
        } catch (error) {
          console.debug('Error sending message to content script:', error);
        }
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
        Reddit Content Filter
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          fullWidth
          value={blockInput}
          onChange={(e) => setBlockInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter term to block"
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
