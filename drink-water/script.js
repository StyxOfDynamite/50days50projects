const smallCups = document.querySelectorAll('.cup-small');
const litres = document.getElementById('litres');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

updateBigCup();

smallCups.forEach((cup, index) => {
    cup.addEventListener('click', () => highlightCups(index));
});

function highlightCups(i) {
    const hasNext = smallCups[i].nextElementSibling !== null;
    if (
        smallCups[i].classList.contains('full') &&
        hasNext &&
        !smallCups[i].nextElementSibling.classList.contains('full')
    ) {
        i--;
    }

    smallCups.forEach((cup, index) => {
        if (index <= i) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });

    updateBigCup();
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;

    if (fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        percentage.style.visibility = 'visible';
        percentage.style.height = `${(fullCups / totalCups) * 330}px`;
        percentage.innerText = `${(fullCups / totalCups) * 100}%`;
    }

    if (fullCups === totalCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        remained.style.visibility = 'visible';
        litres.innerText = `${2 - (250 * fullCups) / 1000}L`;
    }
}
