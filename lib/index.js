"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* ************************************* */
/* Не забыть подключить инлайн exif.js */
/* ************************************* */
/* переворачивалка картинок */
const EXIF = window['EXIF'];
/**
 * Пример качеста картинки
 */
exports.JPG_QUALITY = 0.7;
/**
 * Ориентация фотки берется из камеры
 * @param file
 */
exports.faLoadExifOrientation = (file) => {
    return new Promise((resolve, reject) => {
        // function () - важно иначе неработает !!!
        const exif = EXIF.getData(file, function () {
            if (this.exifdata) {
                resolve(this.exifdata.Orientation);
            }
            else {
                resolve(0);
            }
        });
    });
};
/**
 * Convert input file to base64
 */
exports.faGetBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(String(reader.result));
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};
/**
 * Resize image width
 */
exports.faResizeImg = (nWidth) => (nQuality) => (nOrientation) => (buffImg64) => {
    return new Promise((resolve, reject) => {
        /* Create img native class */
        const img = new Image();
        /* insert base64img */
        img.src = buffImg64;
        /* loading... */
        img.onload = () => {
            /* cavas manipulating */
            const canvas = document.createElement('canvas');
            canvas.width = nWidth;
            /* calc height */
            canvas.height = canvas.width * (img.height / img.width);
            const ctx = canvas.getContext('2d');
            let width = canvas.width;
            let height = canvas.height;
            // calc orientation
            if (nOrientation) {
                if (nOrientation > 4) {
                    canvas.width = height;
                    canvas.height = width;
                }
                switch (nOrientation) {
                    case 2:
                        ctx.translate(width, 0);
                        ctx.scale(-1, 1);
                        break;
                    case 3:
                        ctx.translate(width, height);
                        ctx.rotate(Math.PI);
                        break;
                    case 4:
                        ctx.translate(0, height);
                        ctx.scale(1, -1);
                        break;
                    case 5:
                        width = canvas.height;
                        height = canvas.width;
                        ctx.rotate(0.5 * Math.PI);
                        ctx.scale(1, -1);
                        break;
                    case 6:
                        width = canvas.height;
                        height = canvas.width;
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(0, -height);
                        break;
                    case 7:
                        width = canvas.height;
                        height = canvas.width;
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(width, -height);
                        ctx.scale(-1, 1);
                        break;
                    case 8:
                        width = canvas.height;
                        height = canvas.width;
                        ctx.rotate(-0.5 * Math.PI);
                        ctx.translate(-width, 0);
                        break;
                }
            }
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', nQuality));
        }; // img.onload
    }); // Promise
};
/**
 * Уменьшить размер картинки файла
 * на выходе base64
 * @param nWidth
 */
exports.faResizeImgFile = async (file, nWidth, nQuality) => {
    const orientation = await exports.faLoadExifOrientation(file);
    return await exports.faResizeImg(nWidth)(nQuality)(orientation)(await exports.faGetBase64(file));
};
//# sourceMappingURL=index.js.map