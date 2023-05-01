import axios from 'axios';

export function url(str){return `http://127.0.0.1:8000${str}`};


export function handleScreenSizeChange(setSmallDevice){
    const handleScreenChange = mediaObj => {
        if (mediaObj.matches) {
            setSmallDevice(true);
        }
        else {

            setSmallDevice(false);
        }
    }

    const matchMedia = window.matchMedia("(max-width:1100px)");

    handleScreenChange(matchMedia);
    matchMedia.addListener(handleScreenChange);
}

export function mediaUrl(path){
    return url(`/media/${path}`)
}


export const siteName = 'ChatterBox';

const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instance;