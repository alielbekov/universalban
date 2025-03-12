let currentPlatform = 'reddit';

document.addEventListener('DOMContentLoaded', () => {
  const blockInput = document.getElementById('blockInput');
  const addBlockButton = document.getElementById('addBlock');
  const blockList = document.getElementById('blockList');
  const platformButtons = document.querySelectorAll('.platform-btn');

  // Platform selection
  platformButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      platformButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPlatform = btn.dataset.platform;
      loadBlockList();
    });
  });

  // Add new block
  addBlockButton.addEventListener('click', addNewBlock);
  blockInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewBlock();
  });

  // Load initial blocks
  loadBlockList();

  function addNewBlock() {
    const term = blockInput.value.trim();
    if (!term) return;

    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      platformBlocks[currentPlatform] = platformBlocks[currentPlatform] || [];
      
      if (!platformBlocks[currentPlatform].includes(term)) {
        platformBlocks[currentPlatform].push(term);
        chrome.storage.sync.set({ platformBlocks }, () => {
          blockInput.value = '';
          loadBlockList();
          notifyContentScript(platformBlocks[currentPlatform]);
        });
      }
    });
  }

  function loadBlockList() {
    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      const blockedTerms = platformBlocks[currentPlatform] || [];
      blockList.innerHTML = '';
      
      blockedTerms.forEach(term => {
        const item = document.createElement('div');
        item.className = 'block-item';
        item.innerHTML = `
          <span>${term}</span>
          <button class="remove-btn">Remove</button>
        `;
        
        item.querySelector('.remove-btn').addEventListener('click', () => {
          removeBlock(term);
        });
        
        blockList.appendChild(item);
      });
    });
  }

  function removeBlock(term) {
    chrome.storage.sync.get(['platformBlocks'], (result) => {
      const platformBlocks = result.platformBlocks || {};
      platformBlocks[currentPlatform] = (platformBlocks[currentPlatform] || [])
        .filter(t => t !== term);
      
      chrome.storage.sync.set({ platformBlocks }, () => {
        loadBlockList();
        notifyContentScript(platformBlocks[currentPlatform]);
      });
    });
  }

  function notifyContentScript(blockedTerms) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'updateBlocks',
          platform: currentPlatform,
          blockedTerms: blockedTerms
        });
      }
    });
  }
});
