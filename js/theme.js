function applyTheme(isDarkMode) {
    const root = document.documentElement;
    if (isDarkMode) {
        root.style.setProperty('--bg-color', '#1A1A33');
        root.style.setProperty('--text-color', '#E0E0FF');
        root.style.setProperty('--heading-color', '#26264D');
        root.style.setProperty('--accent-color', '#5865f2');
        root.style.setProperty('--discord-color', '#7289da');
        root.style.setProperty('--shadow-color', 'rgba(15, 15, 15, 0.5)');
        console.log('Dark mode attivato');
        localStorage.setItem('dark-mode', 'true');
    } else {
        root.style.setProperty('--bg-color', '#FFFFFF');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--heading-color', '#2c2c2c');
        root.style.setProperty('--accent-color', '#5865f2');
        root.style.setProperty('--discord-color', '#7289da');
        root.style.setProperty('--shadow-color', 'rgba(15, 15, 15, 0.5)');
        console.log('Dark mode disattivato');
        localStorage.setItem('dark-mode', 'false');
    }
}

function toggleTheme() {
    const root = document.documentElement;
    const isDarkMode = root.style.getPropertyValue('--bg-color') === '#FFFFFF';
    applyTheme(isDarkMode);
}

function loadTheme() {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    applyTheme(isDarkMode);
}

function setInitialTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(isDarkMode);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    applyTheme(e.matches);
});