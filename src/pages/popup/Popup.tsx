import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  IconButton,
  styled,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha
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

const PlatformGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
  gap: theme.spacing(1)
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.3),
    }
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxHeight: 300,
  overflow: 'auto',
  '& .MuiTableCell-root': {
    padding: theme.spacing(1),
  },
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.grey[900],
    fontWeight: 'bold',
  }
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

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
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
        🛑 Universal Ban
      </Typography>

      <PlatformGrid>
        {PLATFORMS.map((platform) => (
          <StyledToggleButton
            key={platform.id}
            value={platform.id}
            selected={selectedPlatform === platform.id}
            onChange={() => handlePlatformChange(platform.id)}
            size="small"
          >
            {platform.name}
          </StyledToggleButton>
        ))}
      </PlatformGrid>

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

      <StyledPaper>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Blocked Terms</TableCell>
                <TableCell align="right" sx={{ width: '80px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(blockedTerms[selectedPlatform] || []).map((term, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ wordBreak: 'break-word', maxWidth: '230px' }}>{term}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveTerm(selectedPlatform, term)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {(blockedTerms[selectedPlatform] || []).length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ color: 'text.secondary' }}>
                    No blocked terms
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </StyledBox>
  );
};

export default Popup;
