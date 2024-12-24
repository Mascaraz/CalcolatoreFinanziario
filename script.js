// Funzione per mostrare la sezione selezionata
function mostraSezione(sezione) {
    const sezioni = document.querySelectorAll('.sezione');
    sezioni.forEach(sezione => sezione.classList.remove('active'));
    document.getElementById(sezione).classList.add('active');
}

// Calcolo Interesse Composto
function calcolaInteresseComposto() {
    const capitale = parseFloat(document.getElementById('capitale').value);
    const depositi = parseFloat(document.getElementById('depositi').value);
    const percentuale = parseFloat(document.getElementById('percentuale').value);
    const periodo = 50;  // 50 anni di durata
    const tipoDeposito = document.getElementById('deposito').value;

    const tassoInteresse = percentuale / 100;
    const risultati = [];
    let resoconto = '';

    for (let anno = 0; anno <= periodo; anno++) {
        let capitaleAnnuo = capitale;

        // Calcola gli interessi composti
        for (let mese = 1; mese <= anno * 12; mese++) {
            if (tipoDeposito === 'mensilmente' && mese % 12 === 0) {
                capitaleAnnuo += depositi;
            }
            capitaleAnnuo += capitaleAnnuo * tassoInteresse / 12;  // Aggiungi gli interessi mensili
        }

        risultati.push(capitaleAnnuo);
        if (anno % 10 === 0) {
            resoconto += `Patrimonio dopo ${anno} anni: €${capitaleAnnuo.toFixed(2)}<br>`;
        }
    }

    // Aggiorna il resoconto
    document.getElementById('resocontoInteresseComposto').innerHTML = resoconto;

    // Genera il grafico
    const ctx = document.getElementById('graficoInteresseComposto').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: periodo + 1 }, (_, i) => i),
            datasets: [{
                label: 'Patrimonio (€)',
                data: risultati,
                borderColor: '#3498db',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Anni'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Capitale (€)'
                    }
                }
            }
        }
    });
}

// Calcolo Estinzione Debito
function calcolaEstinzioneDebito() {
    const debito = parseFloat(document.getElementById('debito').value);
    const tassoDebito = parseFloat(document.getElementById('tasso-debito').value);
    const pagaMensile = parseFloat(document.getElementById('paga-mensile').value);
    const durataFinanziamento = parseInt(document.getElementById('durata-finanziamento').value);

    let saldoDebito = debito;
    const risultatiDebito = [];
    let anni = 0;
    let mesi = 0;

    while (saldoDebito > 0) {
        const interesseMensile = saldoDebito * (tassoDebito / 100) / 12;
        saldoDebito = saldoDebito + interesseMensile - pagaMensile;
        if (saldoDebito < 0) saldoDebito = 0;
        risultatiDebito.push({ mese: mesi, interesse: interesseMensile, capitale: pagaMensile });

        mesi++;
        if (mesi % 12 === 0) anni++;
    }

    // Aggiorna resoconto
    document.getElementById('resocontoEstinzioneDebito').innerHTML = `Durata residua: ${anni} anni e ${mesi % 12} mesi`;

    // Genera il grafico
    const ctx = document.getElementById('graficoEstinzioneDebito').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: risultatiDebito.length }, (_, i) => i + 1),
            datasets: [{
                label: 'Interesse Pagato (€)',
                data: risultatiDebito.map(item => item.interesse),
                backgroundColor: 'rgba(231, 76, 60, 0.6)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }, {
                label: 'Capitale Pagato (€)',
                data: risultatiDebito.map(item => item.capitale),
                backgroundColor: 'rgba(46, 204, 113, 0.6)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Mesi'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Importo (€)'
                    }
                }
            }
        }
    });
}

// Calcolo Crescita Patrimonio
function calcolaCrescitaPatrimonio() {
    const risparmi = parseFloat(document.getElementById('risparmi').value);
    const investimento = parseFloat(document.getElementById('investimento').value);
    const periodo = parseInt(document.getElementById('periodo').value);
    const rischio = document.getElementById('rischio').value;

    let guadagnoMensile;

    // Assegna il guadagno medio in base al rischio
    if (rischio === 'basso') guadagnoMensile = 0.005;
    else if (rischio === 'medio') guadagnoMensile = 0.01;
    else guadagnoMensile = 0.015;

    let patrimonio = 0;
    const risultatiPatrimonio = [];

    for (let anno = 0; anno < periodo; anno++) {
        for (let mese = 0; mese < 12; mese++) {
            patrimonio += risparmi + investimento;
            patrimonio += patrimonio * guadagnoMensile; // Interesse sull'investimento
        }
        risultatiPatrimonio.push(patrimonio);
    }

    // Resoconto
    let resoconto = '';
    for (let i = 0; i < periodo; i++) {
        if (i % 10 === 0) {
            resoconto += `Patrimonio dopo ${i} anni: €${risultatiPatrimonio[i].toFixed(2)}<br>`;
        }
    }
    document.getElementById('resocontoCrescitaPatrimonio').innerHTML = resoconto;

    // Grafico
    const ctx = document.getElementById('graficoCrescitaPatrimonio').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: periodo }, (_, i) => i + 1),
            datasets: [{
                label: 'Patrimonio (€)',
                data: risultatiPatrimonio,
                backgroundColor: '#2ecc71',
                borderColor: '#27ae60',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Anni'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Patrimonio (€)'
                    }
                }
            }
        }
    });
}
