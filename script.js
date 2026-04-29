// Get DOM elements
const bgColorInput = document.getElementById('bgColor');
const textColorInput = document.getElementById('textColor');
const fontSizeInput = document.getElementById('fontSize');
const fontFamilySelect = document.getElementById('fontFamily');
const pageTitleInput = document.getElementById('pageTitle');
const pageContentInput = document.getElementById('pageContent');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');

const preview = document.getElementById('preview');
const previewTitle = document.getElementById('previewTitle');
const previewContent = document.getElementById('previewContent');

// Default values
const defaults = {
    bgColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16',
    fontFamily: 'Arial',
    pageTitle: 'My Blank Page',
    pageContent: ''
};

// Load saved settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('blankPageSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        bgColorInput.value = settings.bgColor || defaults.bgColor;
        textColorInput.value = settings.textColor || defaults.textColor;
        fontSizeInput.value = settings.fontSize || defaults.fontSize;
        fontFamilySelect.value = settings.fontFamily || defaults.fontFamily;
        pageTitleInput.value = settings.pageTitle || defaults.pageTitle;
        pageContentInput.value = settings.pageContent || defaults.pageContent;
    }
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        bgColor: bgColorInput.value,
        textColor: textColorInput.value,
        fontSize: fontSizeInput.value,
        fontFamily: fontFamilySelect.value,
        pageTitle: pageTitleInput.value,
        pageContent: pageContentInput.value
    };
    localStorage.setItem('blankPageSettings', JSON.stringify(settings));
}

// Update preview
function updatePreview() {
    previewTitle.textContent = pageTitleInput.value || 'My Blank Page';
    previewContent.textContent = pageContentInput.value || 'Your content will appear here...';
    
    preview.style.backgroundColor = bgColorInput.value;
    preview.style.color = textColorInput.value;
    preview.style.fontSize = fontSizeInput.value + 'px';
    preview.style.fontFamily = fontFamilySelect.value;
    
    saveSettings();
}

// Event listeners
bgColorInput.addEventListener('change', updatePreview);
bgColorInput.addEventListener('input', updatePreview);
textColorInput.addEventListener('change', updatePreview);
textColorInput.addEventListener('input', updatePreview);
fontSizeInput.addEventListener('input', updatePreview);
fontFamilySelect.addEventListener('change', updatePreview);
pageTitleInput.addEventListener('input', updatePreview);
pageContentInput.addEventListener('input', updatePreview);

// Fullscreen functionality
fullscreenBtn.addEventListener('click', function() {
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    
    const content = document.createElement('div');
    content.className = 'fullscreen-content';
    
    content.style.backgroundColor = bgColorInput.value;
    content.style.color = textColorInput.value;
    
    const page = document.createElement('div');
    page.className = 'fullscreen-page';
    page.style.fontFamily = fontFamilySelect.value;
    page.style.fontSize = fontSizeInput.value + 'px';
    
    const title = document.createElement('h1');
    title.textContent = pageTitleInput.value || 'My Blank Page';
    
    const contentText = document.createElement('p');
    contentText.textContent = pageContentInput.value || 'Your content will appear here...';
    contentText.style.whiteSpace = 'pre-wrap';
    contentText.style.wordWrap = 'break-word';
    
    page.appendChild(title);
    page.appendChild(contentText);
    content.appendChild(page);
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'fullscreen-close';
    closeBtn.textContent = 'Close (ESC)';
    closeBtn.addEventListener('click', function() {
        overlay.remove();
    });
    
    overlay.appendChild(content);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    
    // Close on ESC key
    function handleEsc(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', handleEsc);
        }
    }
    document.addEventListener('keydown', handleEsc);
});

// Reset functionality
resetBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        bgColorInput.value = defaults.bgColor;
        textColorInput.value = defaults.textColor;
        fontSizeInput.value = defaults.fontSize;
        fontFamilySelect.value = defaults.fontFamily;
        pageTitleInput.value = defaults.pageTitle;
        pageContentInput.value = defaults.pageContent;
        updatePreview();
    }
});

// Download functionality
downloadBtn.addEventListener('click', function() {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitleInput.value || 'My Blank Page'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background-color: ${bgColorInput.value};
            color: ${textColorInput.value};
            font-family: ${fontFamilySelect.value}, sans-serif;
            font-size: ${fontSizeInput.value}px;
            padding: 40px;
            line-height: 1.6;
        }
        h1 {
            margin-bottom: 20px;
        }
        p {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    </style>
</head>
<body>
    <h1>${pageTitleInput.value || 'My Blank Page'}</h1>
    <p>${pageContentInput.value || ''}</p>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-page.html';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
});

// Initialize
loadSettings();
updatePreview();
