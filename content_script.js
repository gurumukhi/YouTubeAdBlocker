// Wrapper method to execute when debug mode is on
blockAdWithDebugging = () => {
  console.log('AdFreeYouTube checking for advertisements on the page.');
  ads = findAdDiv();
  videoSkipAdButton = document.querySelector('div.videoAdUiSkipContainer');
  if (!ads.length && !videoSkipAdButton) {
        return;
  }

  console.log('AdFreeYouTube found one or more advertisements on the page, highlighting them and removing from page after 2 seconds. To hide the ad immediately, disable verbose mode in addon options.');
  ads.forEach((ad) => {
    console.log(ad);
    ad.style.border= '2px dotted red';
  });
  if (videoSkipAdButton) {
    console.log(videoSkipAdButton.children[0]);
    videoSkipAdButton.children[0].style.border = '2px solid red';
  }

  setTimeout(() => {
    blockAd();
  }, 5000);
};

// Main method to remove ads
blockAd = () => {
  ads = findAdDiv();
  videoSkipAdButton = document.querySelector('div.videoAdUiSkipContainer');
  if (!ads.length && !videoSkipAdButton) {
        return;
  }

  ads.forEach( (ad) => {
    ad.style.display = 'none';
  });
  if (videoSkipAdButton) {
    videoSkipAdButton.children[0].click();
  }
};

// Method to find all ads on page
findAdDiv = () => {
  adDivArray = [];
  videoFrameFooterAd = document.querySelector('.ad-container');
  sidebarVideoAd = document.querySelector('ytd-iframe-companion-renderer');
  siderbarAdBanner = document.querySelector('ytd-companion-slot-renderer');
  homepageAd = document.querySelector('#ad-iframe');

  if (videoFrameFooterAd && videoFrameFooterAd.style.display !== 'none') {
    adDivArray.push(videoFrameFooterAd);
  }
  if (sidebarVideoAd && sidebarVideoAd.style.display !== 'none') {
    adDivArray.push(sidebarVideoAd);
  }
  if (siderbarAdBanner && siderbarAdBanner.style.display !== 'none') {
    adDivArray.push(siderbarAdBanner);
  }
  if (homepageAd && homepageAd.style.display !== 'none') {
    adDivArray.push(homepageAd);
  }
  return adDivArray;
};

// Initialization
let storageItem = browser.storage.local.get();
storageItem.then((result) => {
  if (result.isDebugModeOn) {
    console.log('Hi from AdFreeYouTube, we are here to give you ad free experience on YouTube.');
    blockAdWithDebugging();
    setInterval(blockAdWithDebugging, 5000);
  } else {
    blockAd();
    setInterval(blockAd, 5000);
  }
});