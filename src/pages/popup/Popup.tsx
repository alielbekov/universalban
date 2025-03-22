import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
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
    backgroundColor: theme.palette.grey[900],
    fontWeight: 'bold',
  }
}));

const Popup: React.FC = () => {
  const [blockTerm, setBlockTerm] = useState<string>('');
  const [blockedTerms, setBlockedTerms] = useState<string[]>([]);

  useEffect(() => {
    // Load blocked terms from storage
    chrome.storage.sync.get(['blockedTerms'], (result) => {
      if (result.blockedTerms) {
        setBlockedTerms(result.blockedTerms);
      }
    });
  }, []);

  const handleAddTerm = () => {
    if (!blockTerm.trim()) return;

    const newTerm = blockTerm.trim();
    const updatedTerms = [...blockedTerms, newTerm];

    chrome.storage.sync.set({ blockedTerms: updatedTerms }, () => {
      setBlockedTerms(updatedTerms);
      setBlockTerm('');
    });
  };

  const handleDeleteTerm = (termToDelete: string) => {
    const updatedTerms = blockedTerms.filter(term => term !== termToDelete);

    chrome.storage.sync.set({ blockedTerms: updatedTerms }, () => {
      setBlockedTerms(updatedTerms);
    });
  };

  return (
    <StyledBox>
      <Typography variant="h6">Universal Content Blocker</Typography>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          value={blockTerm}
          onChange={(e) => setBlockTerm(e.target.value)}
          placeholder="Enter term to block"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTerm()}
        />
        <Button
          variant="contained"
          onClick={handleAddTerm}
          disabled={!blockTerm.trim()}
        >
          Add
        </Button>
      </Box>

      <StyledPaper>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Blocked Term</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blockedTerms.map((term) => (
                <TableRow key={term}>
                  <TableCell>{term}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteTerm(term)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {blockedTerms.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No terms blocked
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
