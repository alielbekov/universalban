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
  styled
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Platform {
  id: string;
  name: string;
}

const PLATFORMS: Platform[] = [
  { id: 'reddit', name: 'Reddit' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'instagram', name: 'Instagram' }
];

const StyledBox = styled(Box)(({ theme }) => ({
  width: '350px',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

const Popup: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('reddit');
  const [blockTerm, setBlockTerm] = useState<string>('');
  const [blockedTerms, setBlockedTerms] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Load blocked terms from storage
    chrome.storage.sync.get(['platformBlocks'], (result) => {
      if (result.platformBlocks) {
        setBlockedTerms(result.platformBlocks);
      }
    });
  }, []);

  const handlePlatformChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPlatform: string
  ) => {
    if (newPlatform !== null) {
      setSelectedPlatform(newPlatform);
    }
  };

  const handleAddTerm = () => {
    if (!blockTerm.trim()) return;

    const updatedTerms = {
      ...blockedTerms,
      [selectedPlatform]: [
        ...(blockedTerms[selectedPlatform] || []),
        blockTerm.trim()
      ]
    };

    chrome.storage.sync.set({ platformBlocks: updatedTerms }, () => {
      setBlockedTerms(updatedTerms);
      setBlockTerm('');
    });
  };

  const handleRemoveTerm = (platform: string, term: string) => {
    const updatedTerms = {
      ...blockedTerms,
      [platform]: blockedTerms[platform].filter(t => t !== term)
    };

    chrome.storage.sync.set({ platformBlocks: updatedTerms }, () => {
      setBlockedTerms(updatedTerms);
    });
  };

  return (
    <StyledBox>
      <Typography variant="h5" component="h1" gutterBottom>
        UniversalBan
      </Typography>

      <ToggleButtonGroup
        value={selectedPlatform}
        exclusive
        onChange={handlePlatformChange}
        aria-label="platform selection"
        size="small"
        fullWidth
      >
        {PLATFORMS.map((platform) => (
          <ToggleButton key={platform.id} value={platform.id}>
            {platform.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          value={blockTerm}
          onChange={(e) => setBlockTerm(e.target.value)}
          placeholder="Enter name or term to block"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTerm()}
        />
        <Button variant="contained" onClick={handleAddTerm}>
          Add
        </Button>
      </Box>

      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {(blockedTerms[selectedPlatform] || []).map((term, index) => (
          <ListItem key={index}>
            <ListItemText primary={term} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveTerm(selectedPlatform, term)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </StyledBox>
  );
};

export default Popup;
