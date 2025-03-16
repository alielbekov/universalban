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
  Grid,
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

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxHeight: 300,
  overflow: 'auto',
  '& .MuiTableCell-root': {
    padding: theme.spacing(1),
  },
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.grey[500],
    fontWeight: 'bold',
  },
  '& .MuiTableRow-root:last-child td': {
    borderBottom: 0,
  }
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  flex: '1 0 30%',
  padding: theme.spacing(1),
  minHeight: '36px',
  '&.MuiToggleButton-root': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    margin: 2,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      }
    }
  }
}));

const PlatformGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  margin: theme.spacing(0, -0.25),
  '& > *': {
    flexBasis: 'calc(33.333% - 8px)',
    flexGrow: 0,
    flexShrink: 0,
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
