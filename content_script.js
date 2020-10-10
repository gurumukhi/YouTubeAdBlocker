// Wrapper method to execute when debug mode is on
blockAdWithDebugging = () => {
  console.log("AdFreeYouTube checking for advertisements on the page.");
  ads = findAdDiv();
  videoSkipAdButton1 = document.querySelector("div.videoAdUiSkipContainer");
  videoSkipAdButton2 = document.querySelector(
    "span.ytp-ad-skip-button-container"
  );
  if (!ads.length && !videoSkipAdButton1 && !videoSkipAdButton2) {
    return;
  }

  console.log(
    "AdFreeYouTube found one or more advertisements on the page, highlighting them and removing from page after 2 seconds. To hide the ad immediately, disable verbose mode in addon options."
  );
  ads.forEach((ad) => {
    console.log(ad);
    ad.style.border = "2px dotted red";
  });
  if (videoSkipAdButton1) {
    console.log(videoSkipAdButton1.children[0]);
    videoSkipAdButton1.children[0].style.border = "2px solid red";
  }
  if (videoSkipAdButton2) {
    console.log(videoSkipAdButton2.children[0]);
    videoSkipAdButton2.children[0].style.border = "2px solid red";
  }

  setTimeout(() => {
    blockAd();
  }, 5000);
};

// Main method to remove ads
blockAd = () => {
  ads = findAdDiv();
  videoSkipAdButton1 = document.querySelector("div.videoAdUiSkipContainer");
  videoSkipAdButton2 = document.querySelector(
    "span.ytp-ad-skip-button-container"
  );
  if (!ads.length && !videoSkipAdButton1 && !videoSkipAdButton2) {
    return;
  }

  ads.forEach((ad) => {
    ad.style.display = "none";
  });
  if (videoSkipAdButton1) {
    videoSkipAdButton1.children[0].click();
  }
  if (videoSkipAdButton2) {
    videoSkipAdButton2.children[0].click();
  }
};

// Method to find all ads on page
findAdDiv = () => {
  adDivArray = [];
  videoFrameFooterAd = document.querySelector(".ad-container");
  sidebarVideoAd = document.querySelector("ytd-iframe-companion-renderer");
  siderbarAdBanner = document.querySelector("ytd-companion-slot-renderer");
  homepageAd = document.querySelector("#ad-iframe");

  if (videoFrameFooterAd && videoFrameFooterAd.style.display !== "none") {
    adDivArray.push(videoFrameFooterAd);
  }
  if (sidebarVideoAd && sidebarVideoAd.style.display !== "none") {
    adDivArray.push(sidebarVideoAd);
  }
  if (siderbarAdBanner && siderbarAdBanner.style.display !== "none") {
    adDivArray.push(siderbarAdBanner);
  }
  if (homepageAd && homepageAd.style.display !== "none") {
    adDivArray.push(homepageAd);
  }
  return adDivArray;
};

// Initialization
let storageItem = browser.storage.local.get();
storageItem.then((result) => {
  // Setting ANNOTATIONS off
  let disabledAnnotationsFrom = null;
  document
    .querySelectorAll(
      "div.ytp-panel-menu div.ytp-menuitem[role=menuitemcheckbox]"
    )
    .forEach((d) => {
      if (
        d.innerText == "Annotations" &&
        d.getAttribute("aria-checked") == "true"
      ) {
        disabledAnnotationsFrom = d;
        d.click();
      }
    });
  // Blocking ADS
  if (result.isDebugModeOn) {
    console.log(
      "Hi from AdFreeYouTube, we are here to give you ad free experience on YouTube."
    );
    if (disabledAnnotationsFrom) {
      console.log("Disabled annotations");
      console.log(disabledAnnotationsFrom);
    }
    blockAdWithDebugging();
    setInterval(blockAdWithDebugging, 5000);
  } else {
    blockAd();
    setInterval(blockAd, 5000);
  }
});
