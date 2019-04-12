export interface ImageFile {
    id: number;
    name: string;
    lastModified: number;
    size: number;
    type: string;
    data: string | ArrayBuffer;
}
