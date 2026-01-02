document.addEventListener('DOMContentLoaded', () => {
    const chars = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    const output = document.getElementById('password-output');
    const lengthSlider = document.getElementById('length-slider');
    const lengthVal = document.getElementById('length-val');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const toast = document.getElementById('toast');

    // Settings
    const opts = {
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        numbers: document.getElementById('numbers'),
        symbols: document.getElementById('symbols')
    };

    function generatePassword() {
        if (!lengthSlider) return;

        let length = parseInt(lengthSlider.value);
        let charset = '';

        if (opts.uppercase && opts.uppercase.checked) charset += chars.uppercase;
        if (opts.lowercase && opts.lowercase.checked) charset += chars.lowercase;
        if (opts.numbers && opts.numbers.checked) charset += chars.numbers;
        if (opts.symbols && opts.symbols.checked) charset += chars.symbols;

        if (charset === '') {
            output.value = 'Select Option!';
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        output.value = password;
    }

    function copyToClipboard() {
        if (!output.value || output.value === 'Select Option!') return;

        navigator.clipboard.writeText(output.value).then(() => {
            showToast();
        }).catch(err => {
            console.error('Failed to copy:', err);
            // Fallback for some contexts
            output.select();
            document.execCommand('copy');
            showToast();
        });
    }

    function showToast() {
        toast.classList.add('visible');
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 2000);
    }

    // Event Listeners
    if (lengthSlider) {
        lengthSlider.addEventListener('input', (e) => {
            if (lengthVal) lengthVal.textContent = e.target.value;
            generatePassword();
        });
    }

    if (generateBtn) generateBtn.addEventListener('click', generatePassword);
    if (copyBtn) copyBtn.addEventListener('click', copyToClipboard);

    Object.values(opts).forEach(opt => {
        if (opt) opt.addEventListener('change', generatePassword);
    });

    // Init
    generatePassword();
});
