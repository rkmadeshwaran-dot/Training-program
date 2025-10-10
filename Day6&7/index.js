 document.getElementById('principal').addEventListener('input', function() {
            const principal = parseFloat(this.value);
            const rateInput = document.getElementById('rate');
            
            if (!isNaN(principal) && principal > 0) {
                let baseRate;
                
                if (principal < 1000) {
                    baseRate = 5;
                } else if (principal >= 1000 && principal <= 5000) {
                    baseRate = 7;
                } else {
                    baseRate = 10;
                }
                
                rateInput.value = baseRate;
            } else {
                rateInput.value = '';
            }
        });

        function calculateInterest() {
            const principal = parseFloat(document.getElementById('principal').value);
            const rate = parseFloat(document.getElementById('rate').value);
            const time = parseFloat(document.getElementById('time').value);

            document.getElementById('interest').textContent = '';
            document.getElementById('totalAmount').textContent = '';
            document.getElementById('additionalInfo').textContent = '';
            document.getElementById('additionalInfo').classList.remove('error-message');

            if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
                alert('Please enter valid numbers in all fields');
                return;
            }
            if (principal <= 0 || rate <= 0 || time <= 0) {
                alert('Please enter positive values');
                return;
            }

            if (principal < 500 || principal > 10000) {
                document.getElementById('additionalInfo').textContent = 
                    'Error: Principal amount must be between $500 and $10,000';
                document.getElementById('additionalInfo').classList.add('error-message');
                return;
            }

            let baseRate;
            let rateReason;

            if (principal < 1000) {
                baseRate = 5;
                rateReason = 'Principal below $1,000';
            } else if (principal >= 1000 && principal <= 5000) {
                baseRate = 7;
                rateReason = 'Principal between $1,000 and $5,000';
            } else {
                baseRate = 10;
                rateReason = 'Principal above $5,000';
            }

            let bonus = 0;
            let bonusApplied = false;
            if (time > 5) {
                bonus = 2;
                bonusApplied = true;
            }

            const finalRate = baseRate + bonus;
            document.getElementById('rate').value = finalRate;
            const interest = (principal * finalRate * time) / 100;
            const totalAmount = principal + interest;

            document.getElementById('interest').textContent = '$' + interest.toFixed(2);
            document.getElementById('totalAmount').textContent = '$' + totalAmount.toFixed(2);

            let infoText = `Base Rate: ${baseRate}% (${rateReason})\n`;
            
            if (bonusApplied) {
                infoText += `Duration Bonus: +${bonus}% (Time > 5 years)\n`;
            }
            
            infoText += `Applied Rate: ${finalRate}%\n`;
            infoText += `Time Period: ${time} year(s)\n`;
            infoText += `Principal: $${principal.toFixed(2)}`;

            document.getElementById('additionalInfo').textContent = infoText;
        }
