/**
 * Пример качеста картинки
 */
export declare const JPG_QUALITY = 0.7;
/**
 * Ориентация фотки берется из камеры
 * @param file
 */
export declare const faLoadExifOrientation: (file: any) => Promise<number>;
/**
 * Convert input file to base64
 */
export declare const faGetBase64: (file: any) => Promise<string>;
/**
 * Resize image width
 */
export declare const faResizeImg: (nWidth: number) => (nQuality: number) => (nOrientation: number) => (buffImg64: string) => Promise<string>;
/**
 * Уменьшить размер картинки файла
 * на выходе base64
 * @param nWidth
 */
export declare const faResizeImgFile: (file: File, nWidth: number, nQuality: number) => Promise<string>;
