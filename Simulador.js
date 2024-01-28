function calculateInvestments() {
    const ValorInicial = parseFloat(document.getElementById('ValorInicial').value);
    const ValorMensal = parseFloat(document.getElementById('ValorMensal').value);
    const Tempo = parseFloat(document.getElementById('Tempo').value);
    const timeUnit = document.getElementById('timeUnit').value;

    const cdiRate = 0.005; // Exemplo de taxa CDI
    const poupancaRate = 0.004; // Exemplo de taxa de poupança
    const tesouroDiretoRate = 0.007; // Exemplo de taxa Tesouro Direto
    
    const data1 = [];
   
for (let i = 1; i <= Tempo; i++) {
    const meses = timeUnit === 'anos' ? i * 12 : i;

    // Calculate monthly growth instead of using Math.pow
    let ValorAcumuladoCDI = ValorInicial;
    let ValorAcumuladoPoupanca = ValorInicial;
    let ValorAcumuladoTesouroDireto = ValorInicial;

    for (let j = 0; j < meses; j++) {
      ValorAcumuladoCDI += ValorMensal;
      ValorAcumuladoCDI *= 1 + cdiRate;

      ValorAcumuladoPoupanca += ValorMensal;
      ValorAcumuladoPoupanca *= 1 + poupancaRate;

      ValorAcumuladoTesouroDireto += ValorMensal;
      ValorAcumuladoTesouroDireto *= 1 + tesouroDiretoRate;
    }

      data1.push({
        meses,
        cdi: ValorAcumuladoCDI,
        poupanca: ValorAcumuladoPoupanca,
        tesouroDireto: ValorAcumuladoTesouroDireto,
      });
    }
  
    document.getElementById('graphContainer').style.display = 'block';

    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Meses');
        data.addColumn('number', 'CDI');
        data.addColumn('number', 'Poupança');
        data.addColumn('number', 'Tesouro Direto');
    
        for (var i = 0; i < data1.length; i++) {
            data.addRow([data1[i].meses, data1[i].cdi, data1[i].poupanca, data1[i].tesouroDireto]);
        }
    
        var options = {
          
            
            colors: ['#44d4ac', '#0077D7', '#2A6275'] 
        };
    
        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    
      }}