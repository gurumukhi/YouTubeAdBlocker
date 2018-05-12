blockAd();
setInterval(blockAd, 5000);

blockAd = () => {
  document.querySelector('.ad-container').style.border= '2px solid red';
  document.querySelector('#google_companion_ad_div').style.border= '2px solid red';

  setTimeout(() => {
    document.querySelector('.ad-container').style.display = 'none';
    document.querySelector('#google_companion_ad_div').style.display = 'none';
  }, 1500);
};