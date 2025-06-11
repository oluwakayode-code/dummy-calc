document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    let currentInput = '0';
    let resetNext = false;

    function formatOutput(output) {
        if (output.length > 14) {
            if (output.includes('.')) {
                output = parseFloat(output).toPrecision(13);
            }
            if (output.length > 14) {
                output = output.slice(0, 14);
            }
        }
        return output;
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '0';
                display.textContent = currentInput;
            } else if (value === '=') {
                try {
                    currentInput = eval(currentInput).toString();
                    display.textContent = formatOutput(currentInput);
                    resetNext = true;
                } catch {
                    display.textContent = 'Error';
                    currentInput = '0';
                    resetNext = true;
                }
            } else {
                if (resetNext) {
                    currentInput = '0';
                    resetNext = false;
                }
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
                display.textContent = formatOutput(currentInput);
            }
        });
    });
});