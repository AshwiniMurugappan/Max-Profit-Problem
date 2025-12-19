// 1. Theme Logic
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const isMars = html.getAttribute('data-theme') === 'mars';
    
    html.setAttribute('data-theme', isMars ? 'earth' : 'mars');
    btn.innerText = isMars ? "🚀 Switch to Mars Mode" : "🌍 Switch to Earth Mode";
}

// 2. Animated Counter Logic (requestAnimationFrame for smooth 60fps)
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerText = `$${Math.floor(progress * (end - start) + start).toLocaleString()}`;
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// 3. Calculation Engine
function calculateMaxProfit() {
    const timeUnit = parseInt(document.getElementById('timeInput').value);
    if (isNaN(timeUnit) || timeUnit < 0) return;

    let maxEarnings = 0;
    let solutions = []; // Stores multiple solutions if they yield the same max

    // Brute force search through all possible building combinations
    for (let t = 0; t <= Math.floor(timeUnit / 5); t++) {
        for (let p = 0; p <= Math.floor(timeUnit / 4); p++) {
            for (let c = 0; c <= Math.floor(timeUnit / 10); c++) {
                
                if ((t * 5 + p * 4 + c * 10) <= timeUnit) {
                    let earnings = 0;
                    let rem = timeUnit;

                    // Sequential Earning Logic: Building finishes, then earns for remainder
                    for(let i=0; i<t; i++) { rem -= 5; earnings += rem * 1500; }
                    for(let i=0; i<p; i++) { rem -= 4; earnings += rem * 1000; }
                    for(let i=0; i<c; i++) { rem -= 10; earnings += rem * 2000; }

                    if (earnings > maxEarnings) {
                        maxEarnings = earnings;
                        solutions = [{ T: t, P: p, C: c }];
                    } else if (earnings === maxEarnings && earnings > 0) {
                        solutions.push({ T: t, P: p, C: c });
                    }
                }
            }
        }
    }

    animateValue("profitDisplay", 0, maxEarnings, 1000);
    updateUI(solutions, timeUnit);
}

// 4. UI Rendering (Timeline & Solutions)
function updateUI(solutions, total) {
    const list = document.getElementById('solutionsList');
    const bar = document.getElementById('timelineBar');
    bar.innerHTML = "";
    list.innerHTML = "";

    if (solutions.length === 0) {
        list.innerHTML = `<p class="placeholder">No profitable combinations found.</p>`;
        return;
    }

    // Display each optimal solution
    solutions.forEach((sol, index) => {
        const solDiv = document.createElement('div');
        solDiv.className = "solution-item";
        solDiv.innerHTML = `
            <p><strong>Solution ${index + 1}:</strong></p>
            <ul>
                <li>Theatres: ${sol.T}</li>
                <li>Pubs: ${sol.P}</li>
                <li>Comm. Parks: ${sol.C}</li>
            </ul>
        `;
        list.appendChild(solDiv);
    });

    // Render Timeline Bar for the FIRST optimal solution
    const firstSol = solutions[0];
    const colors = { T: '#ffb700', P: '#58a6ff', C: '#ff7b72' };
    
    ['T', 'P', 'C'].forEach(type => {
        for(let i=0; i < firstSol[type]; i++) {
            const seg = document.createElement('div');
            seg.className = "timeline-segment";
            const time = type === 'T' ? 5 : type === 'P' ? 4 : 10;
            seg.style.width = `${(time / total) * 100}%`;
            seg.style.backgroundColor = colors[type];
            bar.appendChild(seg);
        }
    });


}

// Auto-run on load
window.onload = calculateMaxProfit;