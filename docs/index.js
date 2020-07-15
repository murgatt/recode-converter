const GITHUB_API_URL = 'https://api.github.com/repos/murgatt/recode-converter/releases/latest';
const LATEST_RELEASE_URL = 'https://github.com/murgatt/recode-converter/releases/latest';

const PLATFORMS = {
    linux: 'linux',
    mac: 'mac',
    windows: 'win',
}

const EXTENSIONS = {
    mac: 'dmg',
    win: 'exe',
}

const getPlatform = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/(mac|os x)/)) {
        return PLATFORMS.mac;
    }
    if (userAgent.match(/windows/)) {
        return PLATFORMS.windows;
    }
    if (userAgent.match(/linux/)) {
        return PLATFORMS.linux;
    }
}

const getAssetDownloadUrl = assets => {
    const platform = getPlatform();
    const extension = EXTENSIONS[platform];
    const platformAsset = assets.find(asset => {
        const splittedName = asset.name.split('.');

        return splittedName[splittedName.length - 1] === extension;
    });

    if (!platformAsset) {
        return LATEST_RELEASE_URL;
    }

    return platformAsset.browser_download_url;
}

const getDownloadUrl = async () => {
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok) {
        return LATEST_RELEASE_URL;
    }
    const data = await response.json();

    return getAssetDownloadUrl(data.assets);
};

const setDownloadUrl = async () => {
    const downloadUrl = await getDownloadUrl();
    document.getElementById('download-button').setAttribute('href', downloadUrl);
};

setDownloadUrl();
