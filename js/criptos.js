const criptos = ['BTC', 'ETH', 'DOGE','USDT','atom','shib','BNB','SOL','XRP']
const criptos2 = ['bitcoin', 'ethereum', 'dogecoin','tether','cosmos','shiba-inu','binancecoin','solana' ]

const getCriptoData = async () => {
    for (let i = 0; i < criptos.length; i++){
        var url = 'https://min-api.cryptocompare.com/data/price?fsym='+criptos[i]+'&tsyms=USD'
        fetch(url).then(response => response.json())
        .then((data) => {
                document.getElementById(criptos[i]).innerHTML = '<b>1 ' + criptos[i]+' ' + data.USD + ' USD</b>';
            });
    }
};   

const getCriptoVol = async () => {
    for (let j = 0; j < criptos2.length; j++){
        var url = 'https://api.coingecko.com/api/v3/coins/'+criptos2[j]+'/market_chart?vs_currency=usd&days=1&interval=daily'
        fetch(url).then(response => response.json())
        .then((data) => {
                // console.log(data);
                document.getElementById(criptos2[j]).innerHTML = data.total_volumes[0];
            });
    }
};   
getCriptoData();
  tcount=0
  setInterval(function(){
    tcount++
    if (tcount==10) {getCriptoData(); tcount=0}
    document.getElementById("infotime").innerHTML = 'Proxima actualización en ' + (10-tcount) + ' segundos'
},1000)

getCriptoVol();
  tcount=0
  setInterval(function(){
    tcount++
    if (tcount==10) {getCriptoVol(); tcount=0}
},1000)

